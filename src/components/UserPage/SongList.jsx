import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heading, Box, Text, List, UnorderedList, ListItem, Grid } from '@chakra-ui/react';
import SongCard from './SongCard';

function SongList() {
    const songs = useSelector(store => store.songs);

    return (
        <Box>
            <Heading textStyle='pageHeader'>Song List</Heading>
            <Grid templateColumns='repeat(4, 1fr)' gap={10} >
                {songs.map(song => <SongCard key={song.id} song={song} />)}
            </Grid>
        </Box>
    );
}

export default SongList;