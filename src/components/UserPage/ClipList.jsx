import {useSelector} from 'react-redux';

function ClipList () {
    const clips = useSelector(store => store.clips);

    return (
        <div>
            <h2>Clip List</h2>
            <ul>
                {clips.map(clip => <li key={clip.id}>{clip.name}</li>)}
            </ul>
        </div>
    );
}

export default ClipList;