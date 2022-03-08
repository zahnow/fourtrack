import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LandingPage.css';
import { Box, Heading, Text, Button, Input, Flex, Center, Container, VStack, Image } from '@chakra-ui/react';

function LandingPage() {
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState('');
  const [addedToMailingList, setAddedToMailingList] = useState(false);
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  function handleMailingList() {
    setEmailInput('');
    setAddedToMailingList(true);
    dispatch({ type: 'REGISTER_MAILING_LIST', payload: { email: emailInput } });
  }

  return (
    <Box className="container">
      {/* Photo by <a href="https://unsplash.com/@john_matychuk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">John Matychuk</a> on <a href="https://unsplash.com/s/photos/band?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
      <Center>
        <Center pos='relative' >
          <Image
            src='/images/splashimage.jpg'
            filter='blur(5px) grayscale(25%) brightness(70%)'
            height='auto'
            maxH='100vh'
            minW='100vw'
            alt='Photo by <a href="https://unsplash.com/@john_matychuk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">John Matychuk</a> on <a href="https://unsplash.com/s/photos/band?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
          />
          <VStack pos='absolute'>
            <Box>
              <Text textStyle='pageHeader' color='white'>NEVER LOSE ANOTHER SONG IDEA</Text>

            </Box>
            <Box>
              <Text textStyle='subHeader' color='white'>Collaboration and Cataloging Tools for Musicians</Text>

            </Box>
          </VStack>
        </Center>
      </Center>

      <Flex mt={8}>
        <Container>
          <Text textStyle='subHeader'>Here's some info</Text>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quam, doloremque?
            Veritatis ipsam in odio illum natus modi iste qui accusamus, laboriosam,
            repellat consequuntur impedit optio distinctio quasi quam veniam expedita magnam vel,
            cum accusantium deleniti.
            Nisi aspernatur doloribus officia laborum velit voluptates aperiam dolor ullam illum quisquam!
            Quis, ea voluptas?
          </Text>
        </Container>

        <Container>
          <Heading>Mailing List</Heading>
          {addedToMailingList ?
            <Text>
              Thank you for joining the mailing list!
            </Text> :
            <>
              <Text>
                If you're interested receiving an invitation to our early access program, sign up for our mailing list!
              </Text>
              <Center mt={8}>
                <Input maxWidth='sm' type='email' value={emailInput} mr={4} onChange={(e) => { setEmailInput(e.target.value) }} />
                <Button colorScheme='green' onClick={handleMailingList}>Submit</Button>
              </Center>
            </>
          }

        </Container>


      </Flex>
    </Box>
  );
}

export default LandingPage;
