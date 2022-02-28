import './SongList.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Container, Button, Table, Thead, Tbody, Tr, Th, Td, Heading} from '@chakra-ui/react';

function SongList() {
    const history = useHistory();
    const songs = useSelector(store => store.songs);

    return (
        <Container maxW='container.lg'>
            <Heading>Song List</Heading>
            <Button onClick={() => history.push('/add-song')}>Add Song</Button>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th>Last Updated</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {songs.map(song => {
                        return (
                        <Tr key={song.id} className='song-table-row' onClick={() => history.push(`/songs/${song.id}`)}>
                            <Td>{song.name}</Td>
                            <Td>{song.description}</Td>
                            <Td>{song.updated_at}</Td>
                        </Tr>)
                    })}
                </Tbody>
            </Table>
        </Container>
    )
}

export default SongList;