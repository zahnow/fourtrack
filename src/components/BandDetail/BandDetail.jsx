import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function BandDetail() {
    const bands = useSelector(store => store.bands);
    const params = useParams();
    const dispatch = useDispatch();
    const bandId = params.bandId;
    const band = bands.find(band => Number(band.id) === Number(bandId));
    const [members, setMembers] = useState([]);
    const [addUserInput, setAddUserInput] = useState('');

    useEffect(() => {
        axios.get(`/api/band/member/${bandId}`)
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.warn(error);
            });
    });

    function handleAddMember() {
        dispatch({
            type: 'ADD_BAND_MEMBER', 
            payload: {
                bandId: bandId, 
                userId: addUserInput, 
                role: 'member'
            }
        });
    }

    function handleDeleteBand() {
        dispatch({
            type: 'DELETE_BAND',
            payload: {
                bandId
            }
        })
    }

    function handleRemoveMember(userId) {
        dispatch({
            type: 'REMOVE_MEMBER',
            payload: {
                bandId,
                userId
            }
        })
    }

    return (
        <div>
            <img src={band?.band_profile_image_path} />
            <h1>{band?.name}</h1>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => {
                        return (
                            <tr key={member.id}>
                                <td>{member.username}</td>
                                <td>{`${member.first_name} ${member.last_name}`}</td>
                                <td>{member.role}</td>
                                <td><button onClick={() => handleRemoveMember(member.id)}>Remove</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>
                <h2>Add Member</h2>
                <label htmlFor="username">
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={addUserInput}
                        required
                        onChange={(event) => setAddUserInput(event.target.value)}
                    />
                </label>
                <button onClick={handleAddMember}>Add Member</button>
            </div>
            <div>
                <h2>Delete Band</h2>
                <button onClick={handleDeleteBand}>Delete</button>
            </div>
        </div>
    );
}

export default BandDetail;