import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

function SongList () {
    const songs = useSelector(store => store.songs);

    return (
        <div>
            <h2>Song List</h2>
            <ul>
                {songs.map(song => <li key={song.id}><Link to={`/songs/${song.id}`}>{song.name}</Link></li>)}
            </ul>
        </div>
    );
}

export default SongList;