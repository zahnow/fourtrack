import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LandingPage.css';
import { Box, Heading, Text, Button, Input, Flex } from '@chakra-ui/react';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('Welcome');
  const [emailInput, setEmailInput] = useState('');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  function handleMailingList() {
    dispatch({type: 'REGISTER_MAILING_LIST', payload: {email: emailInput}});
  }

  return (
    <Box className="container">
      <Heading>{heading}</Heading>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget. Praesent efficitur eros vitae nunc interdum, eu
            interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
            Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
            luctus. Duis a sapien metus.
          </Text>

          <Text>
            Praesent consectetur orci dui, id elementum eros facilisis id. Sed
            id dolor in augue porttitor faucibus eget sit amet ante. Nunc
            consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
            finibus metus facilisis. Nullam eget lectus non urna rhoncus
            accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
            euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
            lobortis augue mi vel felis. Duis ultrices sapien at est convallis
            congue.
          </Text>

          <Heading>Mailing List</Heading>
          <Flex>
          <Input type='email' value={emailInput} onChange={(e) => {setEmailInput(e.target.value)}} />
          <Button onClick={handleMailingList}>Submit</Button>
          </Flex>
          <Text>
            Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
            Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
            vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
            sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
            non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
            amet nisi.
          </Text>


        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </Box>
  );
}

export default LandingPage;
