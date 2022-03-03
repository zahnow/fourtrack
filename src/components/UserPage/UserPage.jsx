import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Button, Heading, Center, Box, Flex, Spacer, Text} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import SongList from './SongList';
import ClipList from './ClipList';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <Center>
    <Box layerStyle={'outerContainer'}>
      <Flex alignItems='center'>
      <Text textStyle='pageHeader'>Recent Songs</Text>
      <Spacer />
      <Button leftIcon={<AddIcon />} colorScheme='green' size='lg' onClick={() => history.push('/add-song')} >New Song</Button>
      </Flex>
      <SongList />
    </Box>
    </Center>

  );
}

// this allows us to use <App /> in index.js
export default UserPage;
