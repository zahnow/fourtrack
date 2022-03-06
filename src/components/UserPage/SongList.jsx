import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Center, Box, Text, Grid } from '@chakra-ui/react';
import SongCard from './SongCard';

function SongList() {
    const allSongs = useSelector(store => store.songs);
    const songs = allSongs.filter(song => song.is_favorite);

    return (
        <Box>
            {songs.length > 0 ? 
                <Grid templateColumns='repeat(3, 1fr)' gap={10} >
                    {songs.map(song => <SongCard key={song.id} song={song} />)}
                </Grid> :
                <Center my={10}>
                    <Text>No favorites yet!</Text>
                </Center>
            }

        </Box>
    );
}

export default SongList;