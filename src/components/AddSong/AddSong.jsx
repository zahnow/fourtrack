import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Center, Heading, Button, Input, Select} from '@chakra-ui/react';

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
        <Center>
        <Box layerStyle='outerContainer'>
            <Heading>New Song</Heading>
            <div>
                <div>
                    <label htmlFor="songname">
                        Song Name:
                        <Input
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
                        <Input
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
                        <Select name="bandselect" value={bandId} onChange={e => setBandId(e.target.value)}>
                            {bands.map(band => {
                                return(
                                    <option key={band.id} value={band.id}>{band.name}</option>
                                )
                            })}
                        </Select>
                    </label>
                </div>
                <div>
                    <Button onClick={handleAddSong}>Add Song</Button>
                </div>
            </div>
        </Box>
        </Center>
    )
}

export default AddSong;