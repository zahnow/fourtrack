import { useSelector } from 'react-redux';
import { Box, VStack, Flex, Circle, Text, Spacer, useStyleConfig } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faFileAudio, faCirclePlay, faMusic, faRecordVinyl } from '@fortawesome/free-solid-svg-icons'

function SongCard({ song }) {
    const clips = useSelector(store => store.clips);    //Using this to calculate the clip count for the song;
    const clipsForSong = clips.filter(clip => clip.song_id === song.id);
    const bands = useSelector(store => store.bands);    //Using this to pull the band's name;
    const bandForSong = bands?.find(band => Number(band.id) === Number(song.band_id));
    dayjs.extend(relativeTime);

    return (
        <Box key={song.id} variant='card'>
            <Link to={`/songs/${song.id}`}>
                <VStack>
                    <Circle size='2xs' bgGradient='linear(to-tl, #8A2387, #E94057, #F27121)'>
                        <FontAwesomeIcon size='10x' icon={faCirclePlay} />
                    </Circle>
                    <Text textStyle='subHeader' maxW='xs' isTruncated>{song.name}</Text>
                    <Text fontWeight='thin'>Updated {dayjs(song.updated_at).fromNow()}</Text>
                </VStack>
            </Link>
        </Box>
    )
}

export default SongCard;