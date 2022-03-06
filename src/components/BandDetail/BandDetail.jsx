import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
    Box,
    Flex,
    Center,
    HStack,
    Avatar,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    VStack,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Spacer
} from '@chakra-ui/react';
import { SettingsIcon, DeleteIcon } from '@chakra-ui/icons';
import GenericDeleteAlert from '../Utilities/GenericDeleteAlert';
import GenericModalInput from '../Utilities/GenericModalInput';

function BandDetail() {
    const bands = useSelector(store => store.bands);
    const params = useParams();
    const dispatch = useDispatch();
    const bandId = params.bandId;
    const history = useHistory();
    const band = bands.find(band => Number(band.id) === Number(bandId));
    const [members, setMembers] = useState([]);

    // Band Deletion Alert Setup
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const dismissAlert = () => setIsAlertOpen(false);

    // Alert Setup
    const [userToRemove, setUserToRemove] = useState('');
    const [isUserDeleteAlertOpen, setIsUserDeleteAlertOpen] = useState(false);
    const dismissUserDeleteAlert = () => setIsUserDeleteAlertOpen(false);

    // Add Member setup - might need to change if we allow editing band
    const { isOpen, onOpen, onClose } = useDisclosure()

    // I'm not sending all band members to redux at the moment.
    useEffect(() => {
        axios.get(`/api/band/member/${bandId}`)
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.warn(error);
            });
    });

    function handleAddMember(userId) {
        onClose();
        dispatch({
            type: 'ADD_BAND_MEMBER',
            payload: {
                bandId: bandId,
                userId: userId,
                role: 'member'
            }
        });
    }

    function handleDeleteBand() {
        dispatch({
            type: 'DELETE_BAND',
            payload: {
                bandId
            }
        })
        history.push('/bands');
    }

    function handleRemoveMember() {
        dismissUserDeleteAlert();
        dispatch({
            type: 'REMOVE_MEMBER',
            payload: {
                bandId,
                userId: userToRemove
            }
        })
    }

    //Add guard for deleted bands
    return (
        <Center>
            <Box layerStyle='outerContainer'>
                <Flex>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='#/bands'>Bands</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`#/bands/${bandId}`} isCurrentPage>{band?.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Spacer />
                    <Menu>
                        <MenuButton as={IconButton} variant='ghost' icon={<SettingsIcon />} />
                        <MenuList>
                            <MenuItem onClick={onOpen}>Add Member</MenuItem>
                            <MenuItem onClick={() => setIsAlertOpen(true)}>Delete Band</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                <Text mx='auto' textStyle='pageHeader'>{band?.name}</Text>


                <VStack>
                </VStack>

                <Table>
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Name</Th>
                            <Th>Role</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {members.map(member => {
                            return (
                                <Tr key={member.id}>
                                    <Td>
                                        <HStack>
                                            <Avatar
                                                src={member.user_profile_image_path}
                                                name={member.username}
                                                size='sm'
                                            />
                                            <Text>
                                                {member.username}
                                            </Text>
                                        </HStack>
                                    </Td>
                                    <Td>{`${member.first_name} ${member.last_name}`}</Td>
                                    <Td>{member.role}</Td>
                                    <Td isNumeric>
                                        <IconButton
                                            variant='ghost'
                                            icon={<DeleteIcon />}
                                            size='sm'
                                            colorScheme='red'
                                            onClick={() => {
                                                setUserToRemove(member.id);
                                                setIsUserDeleteAlertOpen(true);
                                            }}
                                        />
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </Box>

            {/* Alert for deleting the song */}
            <GenericDeleteAlert
                isOpen={isAlertOpen}
                onClose={dismissAlert}
                header={'Delete Band?'}
                body={"Are you sure? You can't undo this action afterwards."}
                deleteFunction={handleDeleteBand}
            />

            {/* Alert for removing a member */}
            <GenericDeleteAlert
                isOpen={isUserDeleteAlertOpen}
                onClose={dismissUserDeleteAlert}
                header={'Remove Member?'}
                body={"Are you sure?"}
                deleteFunction={handleRemoveMember}
            />

            {/* Modal for adding a user */}
            <GenericModalInput
                isOpen={isOpen}
                onClose={onClose}
                header={'Add Member'}
                label={'Username'}
                buttonText={'Add'}
                retFunction={handleAddMember}
            />
        </Center>
    );
}

export default BandDetail;