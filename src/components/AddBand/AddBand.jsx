import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddBand() {
    const user = useSelector(store =>  store.user);
    const [bandName, setBandName] = useState('');
    const [bandImage, setBandImage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    // TODO: REmove user from this dispatch
    function handleAddBand() {
        dispatch({type: 'CREATE_BAND', payload: {band_name: bandName, band_profile_image_path: bandImage, user_id: user.id}});
        history.push('/bands');
    }

    function handleImageUpload() {
        console.log(process.env);
        console.log('in handle upload');
        cloudinary.createUploadWidget({
            sources: ['local'],
            multiple: false,
            clientAllowedFormats: ["png", "jpeg", "jpeg"],
            // cloudName: 'dihyja7id',
            // uploadPreset: 'l4d3xwai'
            cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    setBandImage(result.info.secure_url);
                }
            }
        ).open();
    }

    return (
        <div>
            <h1>Add Band</h1>
            <div>
                <div>
                    <label htmlFor="bandname">
                        Band Name:
                        <input
                            type="text"
                            name="bandname"
                            value={bandName}
                            required
                            onChange={(event) => setBandName(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <button onClick={handleImageUpload}>Upload Image</button>
                </div>
                <div>
                    <button onClick={handleAddBand}>Add Band</button>
                </div>
            </div>

        </div>
    )
}

export default AddBand;