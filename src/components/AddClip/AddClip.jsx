import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Input, Text, Button, Center, Container, useToast } from '@chakra-ui/react';
import { AddIcon, ArrowUpIcon } from '@chakra-ui/icons';

function AddClip() {
    const dispatch = useDispatch();
    const history = useHistory();
    const toast = useToast();
    const [clipName, setClipName] = useState('');
    const [clipUrl, setClipUrl] = useState('');
    const [clipDescription, setClipDescription] = useState('');
    const params = useParams();
    const songId = params.songId;

    function handleAddClip() {
        //TODO: Add validation

        toast({
            title: 'Clip created.',
            description: `${clipName} has been created.`,
            status: 'success',
            duration: 6000,
            isClosable: true,
        })
        dispatch({
            type: 'CREATE_CLIP',
            payload: {
                song_id: songId,
                path: clipUrl,
                name: clipName,
                description: clipDescription
            }
        })
        history.push(`/songs/${songId}`);
    }

    function handleUploadWidget() {
        console.log(process.env);
        console.log('in handle upload');
        cloudinary.createUploadWidget({
            sources: ['local'],
            multiple: false,
            clientAllowedFormats: ["mp3", "wav", "ogg", "webm"],
            // cloudName: 'dihyja7id',
            // uploadPreset: 'l4d3xwai'
            cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    setClipUrl(result.info.secure_url);
                    toast({
                        title: 'Audio uploaded!',
                        description: `You can replace this audio clip by clicking "Replace Audio Clip."`,
                        status: 'success',
                        duration: 6000,
                        isClosable: true,
                    })
                }
            }
        ).open();
    }

    return (
        <Center>
            <Box layerStyle='outerContainer'>
                <Container>
                    <Text textStyle='pageHeader'>Add Clip</Text>
                    <Center>
                        { clipUrl ? 
                        <>
                        <Button leftIcon={<ArrowUpIcon/>} onClick={handleUploadWidget} colorScheme='green'>Replace Audio Clip</Button>
                        </>
                        :
                        <Button leftIcon={<ArrowUpIcon/>} onClick={handleUploadWidget}>Upload Audio Clip</Button>
                    }
                    </Center>
                    <Box>
                        <label htmlFor="clipname">
                            Clip Name:
                            <Input
                                type="text"
                                name="clipname"
                                value={clipName}
                                required
                                onChange={(event) => setClipName(event.target.value)}
                            />
                        </label>
                    </Box>
                    <Box>
                        <label htmlFor="clipdescription">
                            Clip Description:
                            <Input
                                type="text"
                                name="clipdescription"
                                value={clipDescription}
                                required
                                onChange={(event) => setClipDescription(event.target.value)}
                            />
                        </label>
                    </Box>
                    <Center my={8}>
                        <Button colorScheme='green' size='lg' leftIcon={<AddIcon />} onClick={handleAddClip}>Add Clip</Button>
                    </Center>
                </Container>
            </Box>
        </Center>
    );
}

export default AddClip;