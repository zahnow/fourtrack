import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import {Box, Center, Button } from '@chakra-ui/react';

function LoginPage() {
  const history = useHistory();

  return (
    <Center>
    <Box layerStyle='outerContainer'>
      <LoginForm />

      <Center>
        <Button
          variant='link'
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </Center>
    </Box>
    </Center>
  );
}

export default LoginPage;
