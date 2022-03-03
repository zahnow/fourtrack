import { Box, Button, Center, Text } from '@chakra-ui/react';
import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <Center>
    <Box layerStyle='outerContainer'>
      <Text textStyle='pageHeader'>Sign Up</Text>
      <RegisterForm />

      <Center>
        <Button
          variant='link'
          onClick={() => {
            history.push('/login');
          }}
          >
          Login
        </Button>
      </Center>
    </Box>
    </Center>
  );
}

export default RegisterPage;
