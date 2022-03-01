import { useSelector } from 'react-redux';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faFileAudio } from '@fortawesome/free-solid-svg-icons'

function SongCard({song}) {
    const clips = useSelector(store => store.clips);    //Using this to calculate the clip count for the song;
    const clipsForSong = clips.filter(clip => clip.song_id === song.id);
    const bands = useSelector(store => store.bands);    //Using this to pull the band's name;
    const bandForSong = bands?.find(band => Number(band.id) === Number(song.band_id));
    dayjs.extend(relativeTime);

    return (
        <Box key={song.id} maxW='md' bg='red'>
            <Link to={`/songs/${song.id}`}>
                <VStack>
                <Heading fontFamily='Inter'>{song.name}</Heading>
                <Text>Updated {dayjs(song.updated_at).fromNow()}</Text>
                <Text>{clipsForSong.length} <FontAwesomeIcon icon={faFileAudio} /></Text>
                <Text>{song.comment.length} <FontAwesomeIcon icon={faComments} /></Text>
                </VStack>
            </Link>
        </Box>
    )
}

export default SongCard;