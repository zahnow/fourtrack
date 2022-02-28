import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {Heading, Box, List, UnorderedList, ListItem} from '@chakra-ui/react';

function ClipList () {
    const clips = useSelector(store => store.clips);

    return (
        <Box>
            <Heading as='h2'>Clip List</Heading>
            <UnorderedList>
                {clips.map(clip => <ListItem key={clip.id}><Link to={`/clips/${clip.id}`}>{clip.name}</Link></ListItem>)}
            </UnorderedList>
        </Box>
    );
}

export default ClipList;