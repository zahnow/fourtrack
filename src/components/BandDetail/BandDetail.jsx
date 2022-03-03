import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
    Box,
    Flex,
    Center,
    Button,
    HStack,
    Avatar,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    Text,
    VStack,
    IconButton,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    useDisclosure
} from '@chakra-ui/react';
import { SettingsIcon, DeleteIcon } from '@chakra-ui/icons';
import GenericDeleteAlert from '../Utilities/GenericDeleteAlert';

function BandDetail() {
    const bands = useSelector(store => store.bands);
    const params = useParams();
    const dispatch = useDispatch();
    const bandId = params.bandId;
    const history = useHistory();
    const band = bands.find(band => Number(band.id) === Number(bandId));
    const [members, setMembers] = useState([]);
    const [addUserInput, setAddUserInput] = useState('');

    const [bandNameInput, setBandNameInput] = useState('');

    // Band Deletion Alert Setup
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const dismissAlert = () => setIsAlertOpen(false);
    const cancelRef = useRef();

    // Alert Setup
    const [userToRemove, setUserToRemove] = useState('');
    const [isUserDeleteAlertOpen, setIsUserDeleteAlertOpen] = useState(false);
    const dismissUserDeleteAlert = () => setIsUserDeleteAlertOpen(false);
    const cancelUserDeleteRef = useRef();

    // Add Member setup
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

    function handleAddMember() {
        setAddUserInput('');
        onClose();
        dispatch({
            type: 'ADD_BAND_MEMBER',
            payload: {
                bandId: bandId,
                userId: addUserInput,
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
                    {/* <Avatar
                    mx='auto'
                    src={band?.band_profile_image_path}
                    name={band?.name}
                    size='2xl'
                    /> */}
                    <Text mx='auto' textStyle='pageHeader'>{band?.name}</Text>
                    <Menu>
                        <MenuButton as={IconButton} variant='ghost' icon={<SettingsIcon />} />
                        <MenuList>
                            <MenuItem onClick={onOpen}>Add Member</MenuItem>
                            <MenuItem onClick={() => setIsAlertOpen(true)}>Delete Band</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>


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
            <GenericDeleteAlert isOpen={isAlertOpen} onClose={dismissAlert} header={'Delete Band?'} body={"Are you sure? You can't undo this action afterwards."} deleteFunction={handleDeleteBand} />

            {/* Alert for removing a member */}
            <GenericDeleteAlert isOpen={isUserDeleteAlertOpen} onClose={dismissUserDeleteAlert} header={'Remove Member?'} body={"Are you sure?"} deleteFunction={handleRemoveMember} />

            {/* Modal for adding a user */}
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Member</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                name="username"
                                value={addUserInput}
                                required
                                placeholder='Username'
                                onChange={(event) => setAddUserInput(event.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleAddMember} colorScheme='green' mr={3}>
                            Add
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
    );
}

export default BandDetail;