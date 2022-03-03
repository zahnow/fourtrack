import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Center, Input, Heading, Button, Text, VStack, Container } from '@chakra-ui/react';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imagePath, setImagePath] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName,
        image_path: imagePath
      },
    });
  }; // end registerUser

  function handleImageUpload() {
    event.preventDefault();
    console.log(process.env);
    console.log('in handle upload');
    cloudinary.createUploadWidget({
      sources: ['local'],
      multiple: false,
      clientAllowedFormats: ["png", "jpeg", "jpeg"],
      // cloudName: 'dihyja7id',
      // uploadPreset: 'l4d3xwai'
      cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
      uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);
          setImagePath(result.info.secure_url);
        }
      }
    ).open();
  }

  return (
    <Box my={8}>

      {errors.registrationMessage && (
        <Heading className="alert" role="alert">
          {errors.registrationMessage}
        </Heading>
      )}
      <VStack>
        <Avatar src={imagePath} name={`${firstName} ${lastName}`} size='2xl' />
        <Button onClick={handleImageUpload}>Add Image</Button>
        <Container>
          <Text htmlFor="email">
            Email Address:
            <Input
              type="email"
              name="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Text>
          <Text htmlFor="username">
            Username:
            <Input
              type="text"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </Text>
          <Text htmlFor="password">
            Password:
            <Input
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Text>
          <Text htmlFor="firstname">
            First Name:
            <Input
              type="text"
              name="firstname"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Text>
          <Text htmlFor="lastname">
            Last Name:
            <Input
              type="text"
              name="lastname"
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
            />
          </Text>
        </Container>
      </VStack>
        <Center mt={8}>
          <Button onClick={registerUser} name="submit" value="Register" colorScheme='green' size='lg'>Register</Button>
        </Center>
    </Box >
  );
}

export default RegisterForm;
