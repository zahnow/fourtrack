import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function SongDetail() {
    const params = useParams();
    const songId = params.songId;
    const songs = useSelector(store => store.songs);
    const song = songs.find(song => Number(song?.id) === Number(songId));

    return (
        <div>
            <h1>{song?.name}</h1>
            {JSON.stringify(song)}
        </div>
    );
}

export default SongDetail;