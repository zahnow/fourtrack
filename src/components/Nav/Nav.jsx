import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {Box, HStack, Center, Flex, Heading} from '@chakra-ui/react';

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (
    <Flex background='Background'>
      <Link to="/home">
        <Heading as='h1' size='lg'>Fourtrack</Heading>
      </Link>
      <HStack ml='auto' px={10}>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/songs">
              Songs
            </Link>

            <Link className="navLink" to="/bands">
              Bands
            </Link>

            <div className='navLink' onClick={() => dispatch({ type: 'LOGOUT' })}>
              Log Out
            </div>

          </>
        )}
      </HStack>
    </Flex>
  );
}

export default Nav;
