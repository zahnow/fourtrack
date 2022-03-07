import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Center, VStack, Container, Button, Input, Text, Avatar, useToast } from '@chakra-ui/react';
import { AddIcon, ArrowUpIcon } from '@chakra-ui/icons';


function AddBand() {
    const user = useSelector(store => store.user);
    const [bandName, setBandName] = useState('');
    const [bandImage, setBandImage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const toast = useToast();

    // TODO: REmove user from this dispatch
    function handleAddBand() {
        toast({
            title: 'Band created.',
            description: `${bandName} has been created. You can access it from the song list.`,
            status: 'success',
            duration: 6000,
            isClosable: true,
        })
        dispatch({ type: 'CREATE_BAND', payload: { band_name: bandName, band_profile_image_path: bandImage, username: user.username } });
        history.push('/bands');
    }

    function handleImageUpload() {
        console.log(process.env);
        console.log('in handle upload');
        cloudinary.createUploadWidget({
            sources: ['local'],
            multiple: false,
            clientAllowedFormats: ["png", "jpeg"],
            cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    setBandImage(result.info.secure_url);
                }
            }
        ).open();
    }

    return (
        <Center>

            <Box layerStyle='outerContainer'>
                <Text textStyle='pageHeader'>New Band</Text>
                <VStack>
                    <Avatar src={bandImage} name={bandName} size='2xl' />
                    <Button size='sm' leftIcon={<ArrowUpIcon />} onClick={handleImageUpload}>Upload Image</Button>
                        <Input
                            maxW='lg'
                            type="text"
                            name="bandname"
                            placeholder='Band Name'
                            value={bandName}
                            required
                            onChange={(event) => setBandName(event.target.value)}
                        />
                </VStack>
                <Center>
                    <Button my={8} size='lg' leftIcon={<AddIcon />} colorScheme='green' onClick={handleAddBand}>Add Band</Button>
                </Center>


            </Box>
        </Center>
    )
}

export default AddBand;