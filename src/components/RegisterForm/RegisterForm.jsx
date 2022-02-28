import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Input, Heading, Button, Typography } from '@chakra-ui/react';

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
    <Container>


      <form onSubmit={registerUser}>
        <Heading>Register User</Heading>
        {errors.registrationMessage && (
          <Heading className="alert" role="alert">
            {errors.registrationMessage}
          </Heading>
        )}
        <Box>
          <label htmlFor="username">
            Username:
            <Input
              type="text"
              name="username"
              value={username}
              required
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
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </Box>
        <Box>
          <label htmlFor="email">
            Email Address:
            <Input
              type="email"
              name="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </Box>
        <Box>
          <label htmlFor="firstname">
            First Name:
            <Input
              type="text"
              name="firstname"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </Box>
        <Box>
          <label htmlFor="lastname">
            Last Name:
            <Input
              type="text"
              name="lastname"
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </Box>
        <Box>
          <Button onClick={handleImageUpload}>Add Image</Button>
        </Box>
        <Box>
          <Input className="btn" type="submit" name="submit" value="Register" />
        </Box>
      </form>
    </Container>
  );
}

export default RegisterForm;
