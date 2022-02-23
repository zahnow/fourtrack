import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SongList from './SongList';
import ClipList from './ClipList';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <button onClick={() => history.push('/add-song')}>Add Song</button>
      <SongList />
      <button>Add Clip</button>
      <ClipList />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
