import {Box, Flex, HStack, VStack, Text, Avatar, IconButton, Container} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faBars } from "@fortawesome/free-solid-svg-icons";


function CommentCard({comment, deleteFunction}) {
    dayjs.extend(relativeTime);
    const user = useSelector(store => store.user);

    return (
        <Box 
            width='container.md' 
            outline={2} 
            bg='gray.200' 
            rounded={10}
            p={4}
        >
            <Flex>
                <VStack>
                    <Avatar size='xl' src={comment.image_path} />
                </VStack>
                <Container>
                    <HStack>
                        <Text fontWeight='extrabold'>{comment.username}</Text> 
                        <Text>{dayjs(comment.created_at).fromNow()}</Text>
                    </HStack>
                    <Text>{comment.comment}</Text>
                </Container>
                <Box ml='auto'>
                    {comment.user_id === user.id &&
                        <IconButton 
                        icon={ <FontAwesomeIcon icon={faTrashCan} />} 
                        colorScheme='red' 
                        size='sm' 
                        variant='outline'
                        rounded='full'
                        onClick={() => deleteFunction(comment.id)} />}

                </Box>
            </Flex>
        </Box>
    )
}

export default CommentCard;

