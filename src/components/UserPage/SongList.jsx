import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heading, Box, List, UnorderedList, ListItem, Grid } from '@chakra-ui/react';

function SongList() {
    const songs = useSelector(store => store.songs);

    return (
        <Box>
            <Heading>Song List</Heading>
            <Grid templateColumns='repeat(5, 1fr)' gap={10} >
                {songs.map(song => {
                    return (
                        <Box key={song.id} maxW='sm'>
                            <Link to={`/songs/${song.id}`}>
                                {song.name}
                            </Link>
                        </Box>)
                })}
            </Grid>
        </Box>
    );
}

export default SongList;