import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function BandDetail() {
    const bands = useSelector(store => store.bands);
    const params = useParams();
    const bandId = params.bandId;
    const band = bands.find(band => Number(band.id) === Number(bandId));
    const [members, setMembers] = useState([]);

    useEffect(() => {
        axios.get(`/api/band/member/${bandId}`)
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.warn(error);
            });
    });

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
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => {
                        return (
                            <tr key={member.id}>
                                <td>{member.username}</td>
                                <td>{`${member.first_name} ${member.last_name}`}</td>
                                <td>{member.role}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td colSpan='3' >
                            Add Member
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default BandDetail;