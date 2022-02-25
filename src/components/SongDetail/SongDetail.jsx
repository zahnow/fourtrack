import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

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

    return (
        <div>
            <h1>{song?.name}</h1>
            <h2>Clips</h2>
            <h3>Add Clip</h3>
            <button onClick={handleAddClip}>Add Clip</button>
            <ul>
                {clips.map(clip => {
                    return (
                        <li>{clip.name}</li>
                    )
                })}
            </ul>
            <h2>Comments</h2>
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
                    {song?.comment?.length > 0 && song?.comment?.map(comment => {
                        return (
                            <li key={comment.id}>{comment.comment}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default SongDetail;