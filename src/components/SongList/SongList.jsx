import './SongList.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Text, Button, Flex, Center, Table, Thead, Tbody, Tr, Th, Td, Heading, HStack, Spacer, IconButton, LinkBox, LinkOverlay, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

function SongList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const songs = useSelector(store => store.songs);
    const bands = useSelector(store => store.bands);
    dayjs.extend(relativeTime);

    function handleAddFavorite(songId) {
        dispatch({ type: "ADD_SONG_TO_FAVORITES", payload: { songId } });
    }

    function handleRemoveFavorite(songId) {
        dispatch({ type: "REMOVE_SONG_FROM_FAVORITES", payload: { songId } });
    }

    return (
        <Center>
            <Box layerStyle={'outerContainer'}>
                <Flex alignItems='flex-start'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='#/songs' isCurrentPage> Songs</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Spacer />
                    <Button leftIcon={<AddIcon />} colorScheme='green' size='lg' onClick={() => history.push('/add-song')}>New Song</Button>
                </Flex>
                    <Text textStyle='pageHeader'>All Songs</Text>
                <Table variant='striped' size='lg'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th>Band</Th>
                            <Th>Last Updated</Th>
                            <Th>Favorite</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {songs.map(song => {
                            return (
                                <Tr key={song.id} className='song-table-row' onClick={() => history.push(`/songs/${song.id}`)}>
                                {/* <LinkBox as='Tr' key={song.id} className='song-table-row'> */}
                                    <Td>
                                            {song.name}
                                    </Td>
                                    <Td maxW='lg' isTruncated>{song.description}</Td>
                                    <Td>{bands?.find(band => Number(band.id) === Number(song.band_id))?.name}</Td>
                                    <Td>{dayjs(song.updated_at).fromNow()}</Td>
                                    <Td>{song.is_favorite ?
                                        <IconButton variant='ghost' onClick={
                                            (event) => {
                                                event.stopPropagation();
                                                handleRemoveFavorite(song.id);
                                            }
                                        }>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </IconButton> :
                                        <IconButton variant='ghost' onClick={
                                            (event) => {
                                                event.stopPropagation();
                                                handleAddFavorite(song.id);
                                                }
                                            }>
                                            <FontAwesomeIcon icon={emptyHeart} />
                                        </IconButton>}
                                    </Td>
                                </Tr>)
                        })}
                    </Tbody>
                </Table>
            </Box>
        </Center>
    )
}

export default SongList;