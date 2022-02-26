import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function ClipDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const clipId = params.clipId;
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

    return (
        <div>
            <h1>{clip?.name}</h1>
            {/* AUDIO GOES HEREEEEEE */}
                <audio controls src={clip?.path}/>
            <h2>Clip Comments</h2>
            <div>
                <h3>New Comment</h3>
                <div>
                    <label htmlFor="add comment">
                        Message:
                        <input
                            type="text"
                            name="add comment"
                            value={commentInput}
                            required
                            onChange={(event) => setCommentInput(event.target.value)}
                        />
                    </label>
                </div>
                <button onClick={handleAddComment}>Send</button>
            </div>
            <div>
                <ul>
                    {clip?.comment?.length > 0 && clip?.comment?.map(comment => {
                        return (
                            <li key={comment.id}>{comment.comment}</li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <h2>Delete Clip</h2>
                <button onClick={handleDeleteClip} >Delete Clip</button>
            </div>
        </div>
    )
}

export default ClipDetail;