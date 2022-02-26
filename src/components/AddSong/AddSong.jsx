import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddSong() {
    const bands = useSelector(store => store.bands);
    const [songName, setSongName] = useState('');
    const [songDescription, setSongDescription] = useState('');
    const [bandId, setBandId] = useState(bands[0]?.id);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleAddSong() {
        dispatch({type: 'CREATE_SONG', payload: {bandId, songName, songDescription}});
        history.push('/songs');
    }

    return (
        <div>
            <h1>Add Song</h1>
            <div>
                <div>
                    <label htmlFor="songname">
                        Song Name:
                        <input
                            type="text"
                            name="songname"
                            value={songName}
                            required
                            onChange={(event) => setSongName(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="songdescription">
                        Song Description:
                        <input
                            type="text"
                            name="songdescription"
                            value={songDescription}
                            required
                            onChange={(event) => setSongDescription(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="bandselect">
                        Band:
                        <select name="bandselect" value={bandId} onChange={e => setBandId(e.target.value)}>
                            {bands.map(band => {
                                return(
                                    <option key={band.id} value={band.id}>{band.name}</option>
                                )
                            })}
                        </select>
                    </label>
                </div>
                <div>
                    <button onClick={handleAddSong}>Add Song</button>
                </div>
            </div>
        </div>
    )
}

export default AddSong;