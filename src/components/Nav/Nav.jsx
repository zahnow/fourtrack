import { useSelector, useDispatch } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { Link, Box, Flex, Heading, Menu, MenuButton, MenuList, MenuItem, Button, Spacer } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex px={10} py={4}>
      <Link
        as={ReactLink}
        to="/home"
        _hover={{ textDecor: 'none' }}
      >
        <Heading size='2xl' fontWeight='extrabold' >FOURTRACK</Heading>
      </Link>
      <Spacer />
      <Box>

        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Button as={ReactLink} variant='ghost' to="/login">
            Login / Register
          </Button>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Button as={ReactLink} to="/user" variant='ghost'>
              Home
            </Button>

            <Button as={ReactLink} to="/songs" variant='ghost'>
              Songs
            </Button>

            <Button as={ReactLink} to="/bands" variant='ghost'>
              Bands
            </Button>

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='ghost'>
                {user.first_name} 
              </MenuButton>
              <MenuList>
                {/* <MenuItem>
                  Profile
                </MenuItem> */}
                <MenuItem onClick={toggleColorMode}>
                  Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
                </MenuItem>
                <MenuItem onClick={() => dispatch({ type: 'LOGOUT' })}>
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>

          </>
        )}
      </Box>
    </Flex>
  );
}

export default Nav;
