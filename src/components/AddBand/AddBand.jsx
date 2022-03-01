import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, HStack, VStack, Heading, Button, Input, Text, Container } from '@chakra-ui/react';

function AddBand() {
    const user = useSelector(store => store.user);
    const [bandName, setBandName] = useState('');
    const [bandImage, setBandImage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    // TODO: REmove user from this dispatch
    function handleAddBand() {
        dispatch({ type: 'CREATE_BAND', payload: { band_name: bandName, band_profile_image_path: bandImage, user_id: user.id } });
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
        <Container maxW='container.lg' py={10}>
            <Heading>Add Band</Heading>
            <VStack>
                <Box>
                    <Text htmlFor="bandname">
                        Band Name:
                        <Input
                            type="text"
                            name="bandname"
                            value={bandName}
                            required
                            onChange={(event) => setBandName(event.target.value)}
                        />
                    </Text>
                </Box>
                <Button onClick={handleImageUpload}>Upload Image</Button>
                <Button onClick={handleAddBand}>Add Band</Button>
            </VStack>


        </Container>
    )
}

export default AddBand;