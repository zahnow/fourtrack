import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Button, Heading} from '@chakra-ui/react';
import SongList from './SongList';
import ClipList from './ClipList';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <div className="container">
      <Heading>Welcome, {user.username}!</Heading>
      <Button onClick={() => history.push('/add-song')}>Add Song</Button>
      <SongList />
      <Button>Add Clip</Button>
      <ClipList />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
