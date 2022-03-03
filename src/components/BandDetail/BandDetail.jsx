import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Flex, Center, Button, Heading, Avatar, Table, Thead, Tbody, Tr, Th, Td, Input, Text, VStack } from '@chakra-ui/react';

function BandDetail() {
    const bands = useSelector(store => store.bands);
    const params = useParams();
    const dispatch = useDispatch();
    const bandId = params.bandId;
    const history = useHistory();
    const band = bands.find(band => Number(band.id) === Number(bandId));
    const [members, setMembers] = useState([]);
    const [addUserInput, setAddUserInput] = useState('');
    //TODO: Add band name editing
    const [editMode, setEditMode] = useState(false);
    const [editNameInput, setEditNameInput] = useState('');

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

    function handleRemoveMember(userId) {
        dispatch({
            type: 'REMOVE_MEMBER',
            payload: {
                bandId,
                userId
            }
        })
    }

    //Add guard for deleted bands
    return (
        <Center>
            <Box layerStyle='outerContainer'>
                <VStack>
                <Avatar
                    src={band?.band_profile_image_path}
                    name={band?.name}
                    size='2xl'
                />

                    <Text textStyle='pageHeader'>{band?.name}</Text>
                </VStack>

                <Table>
                    <Thead>
                        <Tr>
                            <Th></Th>
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
                                        <Avatar
                                            src={member.user_profile_image_path}
                                            name={member.username}
                                            size='sm'
                                        />
                                    </Td>
                                    <Td>
                                        <Flex alignItems='center'>

                                            {member.username}
                                        </Flex>
                                    </Td>
                                    <Td>{`${member.first_name} ${member.last_name}`}</Td>
                                    <Td>{member.role}</Td>
                                    <Td><Button colorScheme='red' onClick={() => handleRemoveMember(member.id)}>Remove</Button></Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
                <div>
                    <Heading>Add Member</Heading>
                    <Flex>
                        <Text hidden htmlFor="username">
                            Username:
                        </Text>
                        <Input
                            type="text"
                            name="username"
                            value={addUserInput}
                            required
                            placeholder='Username'
                            onChange={(event) => setAddUserInput(event.target.value)}
                        />


                        <Button colorScheme='green' onClick={handleAddMember}>Add Member</Button>
                    </Flex>
                </div>
                <div>
                    <Heading>Delete Band</Heading>
                    <Button colorScheme='red' onClick={handleDeleteBand}>Delete</Button>
                </div>
            </Box>
        </Center>
    );
}

export default BandDetail;