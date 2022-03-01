import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import {
    Text,
    Center,
    Button,
    Heading,
    Textarea,
    VStack,
    Box,
    HStack,
    IconButton,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faBars } from "@fortawesome/free-solid-svg-icons";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SongCommentCard from "../Comments/SongCommentCard";

function SongDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const songId = params.songId;
    const songs = useSelector(store => store.songs);
    const song = songs.find(song => Number(song?.id) === Number(songId));
    const [commentInput, setCommentInput] = useState('');
    const allClips = useSelector(store => store.clips);
    const clips = allClips.filter(clip => Number(clip.song_id) === Number(songId));
    
    // Variables for alert popup
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const dismissAlert = () => setIsAlertOpen(false);
    const cancelRef = useRef();


    dayjs.extend(relativeTime);

    function handleAddComment() {
        dispatch({
            type: 'ADD_SONG_COMMENT',
            payload: {
                comment: commentInput,
                songId: songId
            }
        });
    }

    function handleAddClip() {
        history.push(`/songs/${songId}/add-clip`);
    }

    function handleDeleteSong() {
        dispatch({
            type: 'DELETE_SONG',
            payload: {
                songId
            }
        });
        history.push(`/songs/`);
    }

    return (
        <Center>
            <Box
                width='container.xl'
                bg='blue.200'
                mt={10}
                p={10}
                rounded={10}
            >
                <HStack
                    justifyContent='space-between'
                    alignItems='flex-start'
                >
                    <Box>
                        <Heading as='h1' size='4xl'>{song?.name}</Heading>
                        <Text>{song?.description}</Text>
                    </Box>
                    <Box>
                        <IconButton
                            aria-label='Edit Song'
                            icon={<FontAwesomeIcon icon={faBars} />}
                            colorScheme='blue'
                            variant='outline'
                            rounded='full'
                            onClick={handleDeleteSong}
                            mr={1}
                        />
                        <IconButton
                            aria-label='Delete Song'
                            icon={<FontAwesomeIcon icon={faTrashCan} />}
                            colorScheme='red'
                            variant='outline'
                            rounded='full'
                            onClick={() => setIsAlertOpen(true)}
                        />
                    </Box>
                </HStack>
                <Heading as='h2'>Clips</Heading>
                <HStack>
                    <Heading as='h3' >Add Clip</Heading>
                    <Button onClick={handleAddClip}>Add Clip</Button>
                </HStack>
                <HStack justify='space-between'>
                    {clips.map(clip => {
                        return (
                            <li key={clip.id}><Link to={`/clips/${clip.id}`} > {clip.name}</Link></li>
                        )
                    })}
                </HStack>
                <Heading>Comments</Heading>
                <div>
                    <Heading>New Comment</Heading>
                    <div>
                        <label htmlFor="add comment">
                            Message:
                            <Textarea
                                type="text"
                                name="add comment"
                                value={commentInput}
                                required
                                onChange={(event) => setCommentInput(event.target.value)}
                            />
                        </label>
                    </div>
                    <Button onClick={handleAddComment}>Send</Button>
                </div>
                <VStack>
                    {song?.comment?.length > 0 && song?.comment?.map(comment => <SongCommentCard key={comment.id} comment={comment} />)}
                </VStack>
            </Box>

            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={dismissAlert}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={dismissAlert}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDeleteSong} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </Center>
    );
}

export default SongDetail;