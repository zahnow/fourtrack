import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Button, Heading, Container} from '@chakra-ui/react';
import SongList from './SongList';
import ClipList from './ClipList';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <Container maxW='container.xl'>
      <Heading>Welcome, {user.username}!</Heading>
      <SongList />
      <Button onClick={() => history.push('/add-song')}>Add Song</Button>
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
