import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    Text,
    Center,
    Button,
    Textarea,
    VStack,
    Box,
    HStack,
    IconButton,
    Spacer,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    Stack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon, SettingsIcon } from "@chakra-ui/icons";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SongCommentCard from "./SongCommentCard";
import GenericDeleteAlert from "../Utilities/GenericDeleteAlert";

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

    // Variables for comment deletion popup
    const [isCommentAlertOpen, setIsCommentAlertOpen] = useState(false);
    const dismissCommentAlert = () => setIsCommentAlertOpen(false);

    dayjs.extend(relativeTime);

    function handleAddComment() {
        setCommentInput('');
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
                    <Menu>
                        <MenuButton as={IconButton}
                            aria-label='Song Settings'
                            icon={<SettingsIcon />}
                            variant='ghost'
                            mr={1}
                        />
                        <MenuList>
                            <MenuItem onClick={() => setIsAlertOpen(true)} >Delete Song</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
                <Center>
                    <Text as='h2' textStyle='subHeader'>Clips</Text>
                </Center>
                {clips?.length > 0 ?
                    <>
                        <Flex>
                            <Button ml='auto' leftIcon={<AddIcon />} colorScheme='green' onClick={handleAddClip}>Add Clip</Button>
                        </Flex>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Clip Name</Th>
                                    <Th>Created At</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {clips.map(clip => {
                                    return (
                                        <Tr key={clip.id} onClick={() => history.push(`/clips/${clip.id}`)}>
                                            <Td>
                                                {clip.name}
                                            </Td>
                                            <Td>
                                                {dayjs(clip.created_at).fromNow()}
                                            </Td>

                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </>
                    :
                    <VStack>
                        <Text>No clips yet!</Text>
                        <Button leftIcon={<AddIcon />} colorScheme='green' onClick={handleAddClip}>Add Clip</Button>
                    </VStack>
                }
                <Center>
                    <Box width='container.md'>
                        <Center>
                            <Text textStyle='subHeader'>Comments</Text>
                        </Center>
                        <div>
                            <label htmlFor="add comment">
                                New Comment:
                                <Textarea
                                    type="text"
                                    name="add comment"
                                    width='container.md'
                                    bg='gray.700'
                                    border="2px solid"
                                    borderColor="gray.500"
                                    mb={2}
                                    rounded='16px'
                                    fontWeight='bold'
                                    resize='none'
                                    value={commentInput}
                                    required
                                    onChange={(event) => setCommentInput(event.target.value)}
                                />
                            </label>
                        </div>
                        <Flex>
                            <Spacer />
                            <Button onClick={handleAddComment} colorScheme='green'>Send</Button>
                        </Flex>
                    </Box>
                </Center>
                <Center mt={4}>
                    <Stack direction='column-reverse'>
                        {song?.comment?.length > 0 ?
                            song?.comment?.map(comment => <SongCommentCard key={comment.id} comment={comment} />) :
                            <Text mt={16}>No comments yet!</Text>
                        }
                    </Stack>
                </Center>
            </Box>

            {/* Alert for deleting the song */}
            <GenericDeleteAlert isOpen={isAlertOpen} onClose={dismissAlert} header={"Delete Song?"} body={"Are you sure? You can't undo this action afterwards."} deleteFunction={handleDeleteSong} />

            {/* Alert for deleting a comment */}
            <GenericDeleteAlert isOpen={isCommentAlertOpen} onClose={dismissCommentAlert} header={"Delete Comment?"} body={"Are you sure? You can't undo this action afterwards."} deleteFunction={handleDeleteComment} />

        </Center>
    );
}

export default SongDetail;