import {Box, Flex, HStack, VStack, Text, Avatar, IconButton, Container} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useSelector} from 'react-redux';
import { DeleteIcon } from '@chakra-ui/icons';


function CommentCard({comment, deleteFunction}) {
    dayjs.extend(relativeTime);
    const user = useSelector(store => store.user);

    return (
        <Box layerStyle='commentContainer'>
            <Flex>
                <VStack>
                    <Avatar size='xl' src={comment.image_path} />
                </VStack>
                <Container>
                    <HStack>
                        <Text fontSize='lg' fontWeight='extrabold'>{comment.username}</Text> 
                        <Text fontSize='sm'>{dayjs(comment.created_at).fromNow()}</Text>
                    </HStack>
                    <Text>{comment.comment}</Text>
                </Container>
                <Box ml='auto' alignSelf='flex-end'>
                    {comment.user_id === user.id &&
                        <IconButton 
                        icon={ <DeleteIcon />} 
                        colorScheme='red' 
                        size='sm' 
                        variant='ghost'
                        onClick={() => deleteFunction(comment.id)} />}

                </Box>
            </Flex>
        </Box>
    )
}

export default CommentCard;

