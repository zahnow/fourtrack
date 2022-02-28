import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { Heading, Box, List, UnorderedList, ListItem } from '@chakra-ui/react';

function SongList () {
    const songs = useSelector(store => store.songs);

    return (
        <Box>
            <Heading>Song List</Heading>
            <UnorderedList>
                {songs.map(song => <ListItem key={song.id}><Link to={`/songs/${song.id}`}>{song.name}</Link></ListItem>)}
            </UnorderedList>
        </Box>
    );
}

export default SongList;