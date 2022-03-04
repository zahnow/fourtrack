import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
    Box,
    Flex,
    Avatar,
    Button,
    Textarea,
    Heading,
    Center,
    IconButton,
    Text,
    Spacer,
    VStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    HStack
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import ClipCommentCard from './ClipCommentCard';
import GenericDeleteAlert from '../Utilities/GenericDeleteAlert';

// Wavesurfer imports
import { WaveSurfer, WaveForm } from "wavesurfer-react";


function ClipDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const clipId = params.clipId;
    const user = useSelector(store => store.user);
    const clips = useSelector(store => store.clips);
    const clip = clips.find(clip => Number(clip.id) === Number(clipId));
    const [commentInput, setCommentInput] = useState('');

    // Variables for clip deletion popup
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const dismissAlert = () => setIsAlertOpen(false);

    // Variables for comment deletion popup
    const [isCommentAlertOpen, setIsCommentAlertOpen] = useState(false);
    const dismissCommentAlert = () => setIsCommentAlertOpen(false);

    // Wavesurfer
    let linGrad = document.createElement('canvas').getContext('2d').createLinearGradient(0, 0, 1000, 128);
    linGrad.addColorStop(0, '#F27121'); 
    linGrad.addColorStop(0.5, '#E94057');
    linGrad.addColorStop(1, '#8A2387');


    // Wait for clip to exist, then load.
    // Might need to check that wavesurfer exists as well?
    useEffect(() => {
        if (clip?.path) {
            console.log('clip updated, attempting to load', clip.path);
            wavesurferRef.current.load(clip.path);
        }
    }, [clip])

    const wavesurferRef = useRef();
    const handleWSMount = useCallback(
        waveSurfer => {
            wavesurferRef.current = waveSurfer;
            if (wavesurferRef.current) {
                //wavesurferRef.current.load(`https://res.cloudinary.com/dihyja7id/video/upload/v1646407801/cgoryv723oacxbiiz81a.mp3`);
                //wavesurferRef.current.load(`clip?.path`);

                wavesurferRef.current.on("ready", () => {
                    console.log("WaveSurfer is ready");
                });

                wavesurferRef.current.on("loading", data => {
                    console.log("loading --> ", data);
                });

                if (window) {
                    window.surferidze = wavesurferRef.current;
                }
            }
        },
    );

    const play = useCallback(() => {
        wavesurferRef.current.playPause();
    }, []);

    function handleAddComment() {
        setCommentInput('');
        dispatch({
            type: 'ADD_CLIP_COMMENT',
            payload: {
                comment: commentInput,
                clipId: clipId
            }
        });
    }

    function handleDeleteClip() {
        const songId = clip.song_id;
        dispatch({
            type: 'DELETE_CLIP',
            payload: {
                clipId
            }
        });
        history.push(`/songs/${songId}`);
    }


    function handleDeleteComment(commentId) {
        console.log(commentId)
        dispatch({
            type: 'DELETE_CLIP_COMMENT',
            payload: {
                commentId
            }
        })
    }

    return (
        <Center>
            <Box layerStyle='outerContainer'>
                <Flex>
                    <Text textStyle='pageHeader'>{clip?.name}</Text>
                    <Spacer />
                    <Menu>
                        <MenuButton as={IconButton}
                            aria-label='Clip Setttings'
                            icon={<SettingsIcon />}
                            variant='ghost'
                        />

                        <MenuList>
                            <MenuItem onClick={() => setIsAlertOpen(true)} >Delete Clip</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                {/* AUDIO GOES HEREEEEEE */}
                <Box>
                    <Box 
                        maxW='3xl' 
                        ml='auto' 
                        mr='auto' 
                        border='2px' 
                        borderColor='gray.500' 
                        borderRadius='16px'
                        overflow='hidden'
                        mb={4}
                    >
                        <WaveSurfer onMount={handleWSMount}>
                            <WaveForm 
                                id="waveform" 
                                barHeight='.5' 
                                barWidth='1' 
                                barGap='2' 
                                progressColor={linGrad}
                            >
                            </WaveForm>
                        </WaveSurfer>
                    </Box>

                    <Center mb={8}>
                        <Button colorScheme='blue' onClick={play}>Play / Pause</Button>
                        {/* <audio style={{ width: '50%' }} controls src={clip?.path} /> */}
                    </Center>
                    <Center>
                        <Text textStyle='subHeader'>Comments</Text>
                    </Center>
                    <Center>
                        <VStack width='container.md'>
                            <Text as='label' htmlFor="new comment">
                                Message:
                                <Textarea
                                    type="text"
                                    name="new comment"
                                    width='container.md'
                                    bg='gray.700'
                                    border="2px solid"
                                    borderColor="gray.500"
                                    mb={2}
                                    rounded='16px'
                                    fontWeight='bold'
                                    resize='none'
                                    color="white"
                                    value={commentInput}
                                    required
                                    onChange={(event) => setCommentInput(event.target.value)}
                                />
                            </Text>
                            <Flex>
                                <Spacer />
                                <Button
                                    ml='auto'
                                    onClick={handleAddComment}
                                    colorScheme='green'
                                >Send</Button>

                            </Flex>
                            {/* Comment List */}
                            <Box>
                                <VStack>
                                    {clip?.comment?.length > 0 && clip?.comment?.map(comment => {
                                        return (
                                            <ClipCommentCard key={comment.id} comment={comment} />
                                        )
                                    })}
                                </VStack>
                            </Box>
                        </VStack>
                    </Center>
                </Box>
            </Box>

            {/* Alert for deleting the song */}
            <GenericDeleteAlert
                isOpen={isAlertOpen}
                onClose={dismissAlert}
                header={"Delete Clip?"}
                body={"Are you sure? You can't undo this action afterwards."}
                deleteFunction={handleDeleteClip}
            />

            {/* Alert for deleting a comment */}
            <GenericDeleteAlert
                isOpen={isCommentAlertOpen}
                onClose={dismissCommentAlert}
                header={"Delete Comment?"}
                body={"Are you sure? You can't undo this action afterwards."}
                deleteFunction={handleDeleteComment}
            />
        </Center>
    )
}

export default ClipDetail;