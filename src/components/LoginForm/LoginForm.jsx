import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Box, Button, Input, Heading, Text, Center, Container } from '@chakra-ui/react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <>
    <Text textStyle='pageHeader'>Login</Text>
    <Center>

      <Container>
      <form onSubmit={login}>
        {errors.loginMessage && (
          <Heading className="alert" role="alert">
            {errors.loginMessage}
          </Heading>
        )}
        <Box>
          <label htmlFor="username">
            Username:
            <Input
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </Box>
        <Box>
          <label htmlFor="password">
            Password:
            <Input
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </Box>
        <Center my={8}>
          <Button type="submit" size='lg' name="submit" colorScheme='green'>Log In</Button>
        </Center>
      </form>
      </Container>
    </Center>
    </>
  );
}

export default LoginForm;
