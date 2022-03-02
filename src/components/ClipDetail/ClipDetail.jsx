import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Flex, Avatar, Button, Textarea, Heading, Center, IconButton, UnorderedList, ListItem, Text, Spacer } from '@chakra-ui/react';
import CommentCard from '../Comments/CommentCard';
import { DeleteIcon } from '@chakra-ui/icons';

function ClipDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const clipId = params.clipId;
    const user = useSelector(store => store.user);
    const clips = useSelector(store => store.clips);
    const clip = clips.find(clip => Number(clip.id) === Number(clipId));
    const [commentInput, setCommentInput] = useState('');


    function handleAddComment() {
        dispatch({
            type: 'ADD_CLIP_COMMENT',
            payload: {
                comment: commentInput,
                clipId: clipId
            }
        });
    }

    function handleDeleteClip() {
        const songId = clip.song_id;
        dispatch({
            type: 'DELETE_CLIP',
            payload: {
                clipId
            }
        });
        history.push(`/songs/${songId}`);
    }


    function handleDeleteComment(commentId) {
        console.log(commentId)
        dispatch({
            type: 'DELETE_CLIP_COMMENT',
            payload: {
                commentId
            }
        })
    }

    return (
        <Center>
            <Box layerStyle='outerContainer'>
                <Flex>
                    <Text textStyle='pageHeader'>{clip?.name}</Text>
                    <Spacer />
                    <IconButton aria-label='Delete Clip' icon={<DeleteIcon />} onClick={handleDeleteClip} colorScheme='red' variant='ghost' />
                </Flex>
                {/* AUDIO GOES HEREEEEEE */}
                <Center>
                    <audio controls src={clip?.path} />

                </Center>
                <Text textStyle='subHeader'>Comments</Text>
                <Center>
                    <Box layerStyle='innerContainer'>
                        <Heading as='h3' size='md'>New Comment</Heading>
                        <Box>
                            <Text as='label' htmlFor="add comment">
                                Message:
                                <Textarea
                                    type="text"
                                    name="add comment"
                                    value={commentInput}
                                    required
                                    onChange={(event) => setCommentInput(event.target.value)}
                                />
                            </Text>
                        </Box>
                        <Button onClick={handleAddComment}>Send</Button>
                        <Box>
                            <UnorderedList>
                                {clip?.comment?.length > 0 && clip?.comment?.map(comment => {
                                    return (
                                        <ListItem key={comment.id} layerStyle='commentContainer'>{comment.comment} <Avatar src={comment.image_path} /> {comment.username}
                                            {comment.user_id === user.id &&
                                                <Button colorScheme='red' size='xs' onClick={() => handleDeleteComment(comment.id)}>Delete</Button>}
                                        </ListItem>
                                    )
                                })}
                            </UnorderedList>
                        </Box>
                    </Box>
                </Center>
            </Box>
        </Center>
    )
}

export default ClipDetail;