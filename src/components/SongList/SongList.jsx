import './SongList.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Text, Button, Flex, Center, Table, Thead, Tbody, Tr, Th, Td, Heading, HStack, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

function SongList() {
    const history = useHistory();
    const songs = useSelector(store => store.songs);
    const bands = useSelector(store => store.bands);
    dayjs.extend(relativeTime);

    return (
        <Center>
            <Box layerStyle={'outerContainer'}>
                <Flex>
                    <Text textStyle='pageHeader'>All Songs</Text>
                    <Spacer />
                    <Button leftIcon={<AddIcon />} colorScheme='green' size='lg' onClick={() => history.push('/add-song')}>New Song</Button>
                </Flex>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th>Band</Th>
                            <Th>Last Updated</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {songs.map(song => {
                            return (
                                <Tr key={song.id} className='song-table-row' onClick={() => history.push(`/songs/${song.id}`)}>
                                    <Td>{song.name}</Td>
                                    <Td>{song.description}</Td>
                                    <Td>{bands?.find(band => Number(band.id) === Number(song.band_id))?.name}</Td>
                                    <Td>{dayjs(song.updated_at).fromNow()}</Td>
                                </Tr>)
                        })}
                    </Tbody>
                </Table>
            </Box>
        </Center>
    )
}

export default SongList;