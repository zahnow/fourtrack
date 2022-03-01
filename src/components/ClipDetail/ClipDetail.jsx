import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {Box, Avatar, Button, Textarea, Heading, Container, List, UnorderedList, ListItem} from '@chakra-ui/react';
import CommentCard from '../Comments/CommentCard';

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
        <Container >
            <Heading>{clip?.name}</Heading>
            {/* AUDIO GOES HEREEEEEE */}
                <audio controls src={clip?.path}/>
            <Heading as='h2' size='lg'>Clip Comments</Heading>
            <Box>
                <Heading as='h3' size='md'>New Comment</Heading>
                <Box>
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
                </Box>
                <Button onClick={handleAddComment}>Send</Button>
            </Box>
            <Box>
                <UnorderedList>
                    {clip?.comment?.length > 0 && clip?.comment?.map(comment => {
                        return (
                            <ListItem key={comment.id}>{comment.comment} <Avatar src={comment.image_path} /> {comment.username}
                                {comment.user_id === user.id && 
                                <Button colorScheme='red' size='xs' onClick={() => handleDeleteComment(comment.id)}>Delete</Button>}
                            </ListItem>
                        )
                    })}
                </UnorderedList>
            </Box>
            <Box>
                <Heading as='h2' size='lg'>Delete Clip</Heading>
                <Button onClick={handleDeleteClip} colorScheme='red' >Delete Clip</Button>
            </Box>
        </Container>
    )
}

export default ClipDetail;