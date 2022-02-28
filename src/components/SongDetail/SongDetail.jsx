import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import {Avatar, Button, Heading, Input, Textarea} from '@chakra-ui/react';

function SongDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const songId = params.songId;
    const user = useSelector(store => store.user);
    const songs = useSelector(store => store.songs);
    const song = songs.find(song => Number(song?.id) === Number(songId));
    const [commentInput, setCommentInput] = useState('');
    const allClips = useSelector(store => store.clips);
    const clips = allClips.filter(clip => Number(clip.song_id) === Number(songId));

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
        <div>
            <Heading>{song?.name}</Heading>
            <Heading as='h2'>Clips</Heading>
            <Heading as='h3' >Add Clip</Heading>
            <Button onClick={handleAddClip}>Add Clip</Button>
            <ul>
                {clips.map(clip => {
                    return (
                        <li><Link to={`/clips/${clip.id}`} > {clip.name}</Link></li>
                    )
                })}
            </ul>
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
            <div>
                <ul>
                    {song?.comment?.length > 0 && song?.comment?.map(comment => {
                        return (
                            <li key={comment.id}>{comment.comment} <Avatar src={comment.image_path} /> {comment.username} 
                                {comment.user_id === user.id && 
                                    <Button colorScheme='red' size='xs' onClick={() => handleDeleteComment(comment.id)}>Delete</Button>}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <Heading >Delete Song?</Heading>
                <Button colorScheme='red' onClick={handleDeleteSong}>Delete Song</Button>
            </div>
        </div>
    );
}

export default SongDetail;