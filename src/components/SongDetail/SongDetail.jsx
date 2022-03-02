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
    Spacer,
    Flex
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon, SettingsIcon } from "@chakra-ui/icons";
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

    // Variables for song deletion popup
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const dismissAlert = () => setIsAlertOpen(false);
    const cancelRef = useRef();

    // Variables for comment deletion popup
    const [isCommentAlertOpen, setIsCommentAlertOpen] = useState(false);
    const dismissCommentAlert = () => setIsCommentAlertOpen(false);
    const cancelCommentRef = useRef();

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

    function handleDeleteComment(commentId) {
        console.log(commentId)
        dispatch({
            type: 'DELETE_SONG_COMMENT',
            payload: {
                commentId
            }
        })
    }

    return (
        <Center>
            <Box layerStyle={'outerContainer'} >
                <HStack
                    justifyContent='space-between'
                    alignItems='flex-start'
                >
                    <Box>
                        <Text textStyle={'pageHeader'}>{song?.name}</Text>
                        <Text mt={4}>{song?.description}</Text>
                    </Box>
                    <Box>
                        <IconButton
                            aria-label='Edit Song'
                            icon={<SettingsIcon />}
                            variant='outline'
                            rounded='full'
                            mr={1}
                        />
                        <IconButton
                            aria-label='Delete Song'
                            icon={<DeleteIcon />}
                            colorScheme='red'
                            variant='outline'
                            rounded='full'
                            onClick={() => setIsAlertOpen(true)}
                        />
                    </Box>
                </HStack>
                <Flex>
                    <Heading as='h2'>Clips</Heading>
                    <Spacer />
                    <Button leftIcon={<AddIcon />} colorScheme='green' onClick={handleAddClip}>Add Clip</Button>

                </Flex>
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

            {/* Alert for deleting the song */}
            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={dismissAlert}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Song?
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

            {/* Alert for deleting a comment */}
            <AlertDialog
                isOpen={isCommentAlertOpen}
                leastDestructiveRef={cancelCommentRef}
                onClose={dismissCommentAlert}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Comment?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelCommentRef} onClick={dismissCommentAlert}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDeleteComment} ml={3}>
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