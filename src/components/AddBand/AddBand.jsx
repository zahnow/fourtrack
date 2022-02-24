import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddBand() {
    const user = useSelector(store =>  store.user);
    const [bandName, setBandName] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    function handleAddBand() {
        dispatch({type: 'CREATE_BAND', payload: {band_name: bandName, user_id: user.id}});
        history.push('/bands');
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
                    <button onClick={handleAddBand}>Add Band</button>
                </div>
            </div>

        </div>
    )
}

export default AddBand;