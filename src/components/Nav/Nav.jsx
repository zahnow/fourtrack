import { useSelector, useDispatch } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { Link, HStack, Flex, Heading } from '@chakra-ui/react';

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (
    <Flex px={10} py={4}>
        <Link 
          as={ReactLink} 
          to="/home"
          _hover={{ textDecor: 'none' }}
        >
          <Heading as='h1' size='2xl' fontWeight='extrabold' >FOURTRACK</Heading>
        </Link>
        <HStack ml='auto'>

          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links
            <Link as={ReactLink} to="/login">
              Login / Register
            </Link>
          )}

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <Link as={ReactLink} to="/user">
                Home
              </Link>

              <Link as={ReactLink} to="/songs">
                Songs
              </Link>

              <Link as={ReactLink} to="/bands">
                Bands
              </Link>

              <Link onClick={() => dispatch({ type: 'LOGOUT' })}>
                Log Out
              </Link>

            </>
          )}
        </HStack>
    </Flex>
  );
}

export default Nav;
