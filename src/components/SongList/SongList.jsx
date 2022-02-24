import './SongList.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function SongList() {
    const history = useHistory();
    const songs = useSelector(store => store.songs);

    return (
        <div>
            <h1>Song List</h1>
            <button onClick={() => history.push('/add-song')}>Add Song</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map(song => {
                        return (
                        <tr key={song.id} className='song-table-row' onClick={() => history.push(`/songs/${song.id}`)}>
                            <th>{song.name}</th>
                            <th>{song.description}</th>
                            <th>{song.updated_at}</th>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SongList;