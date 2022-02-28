import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Center, Heading, Button, Grid, GridItem, Text} from '@chakra-ui/react';

function BandList() {
    const history = useHistory();
    const bands = useSelector(store => store.bands);
    
    return (
        <div>
            <Heading>Band List</Heading>
            <Button colorScheme='green' onClick={() => history.push('/addband')}>New Band</Button>
            <Grid templateColumns='repeat(3, 1fr)'>
                {bands.map(band => {
                    return (
                        <GridItem key={band.id} borderWidth='1px' borderRadius='lg' m='lg' >
                            <Link to={`/bands/${band.id}`}>
                                <Center>
                                    <Avatar size='2xl' name={band.name} src={band.band_profile_image_path} />
                                </Center>
                                <Center>
                                    <Text>{band.name}</Text>    
                                </Center>
                            </Link>
                        </GridItem>
                    )
                })}
            </Grid>
        </div>
    )
}

export default BandList;