import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

function ClipList () {
    const clips = useSelector(store => store.clips);

    return (
        <div>
            <h2>Clip List</h2>
            <ul>
                {clips.map(clip => <li key={clip.id}><Link to={`/clips/${clip.id}`}>{clip.name}</Link></li>)}
            </ul>
        </div>
    );
}

export default ClipList;