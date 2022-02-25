import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function AddClip() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [clipName, setClipName] = useState('');
    const [clipUrl, setClipUrl] = useState('');
    const [clipDescription, setClipDescription] = useState('');
    const params = useParams();
    const songId = params.songId;

    function handleAddClip() {
        //TODO: Add validation

        dispatch({
            type: 'CREATE_CLIP', 
            payload: {
                song_id: songId,
                path: clipUrl,
                name: clipName,
                description: clipDescription
            }
        })
        history.push(`/songs/${songId}`);
    }

    function handleUploadWidget() {
        console.log(process.env);
        console.log('in handle upload');
        cloudinary.createUploadWidget({
            sources: ['local'],
            multiple: false,
            clientAllowedFormats: ["mp3", "wav", "ogg", "webm"],
            // cloudName: 'dihyja7id',
            // uploadPreset: 'l4d3xwai'
            cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    setClipUrl(result.info.secure_url);
                }
            }
        ).open();
    }

    return (
        <div>
            <h1>Add Clip</h1>
            <div>
                <label htmlFor="clipname">
                    Clip Name:
                    <input
                        type="text"
                        name="clipname"
                        value={clipName}
                        required
                        onChange={(event) => setClipName(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="clipdescription">
                    Clip Description:
                    <input
                        type="text"
                        name="clipdescription"
                        value={clipDescription}
                        required
                        onChange={(event) => setClipDescription(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <button onClick={handleUploadWidget}>Upload Audio Clip</button>
            </div>
            <div>
                <button onClick={handleAddClip}>Add Clip</button>
            </div>
        </div>
    );
}

export default AddClip;