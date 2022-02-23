import {useSelector} from 'react-redux';

function SongList () {
    const songs = useSelector(store => store.songs);

    return (
        <div>
            <h2>Song List</h2>
            <ul>
                {songs.map(song => <li key={song.id}>{song.name}</li>)}
            </ul>
        </div>
    );
}

export default SongList;