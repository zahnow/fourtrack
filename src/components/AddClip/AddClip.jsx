import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Uppy from '@uppy/core'


function AddClip() {
    const [clipName, setClipName] = useState('');
    const [clipUrl, setClipUrl] = useState('');

    function handleAddClip() {
        return;
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
                <button onClick={handleAddClip}>Add Clip</button>
            </div>
        </div>
    );
}

export default AddClip;