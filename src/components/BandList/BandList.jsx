import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Box, Center, Container, Heading, Button, Grid, GridItem, Text } from '@chakra-ui/react';

function BandList() {
    const history = useHistory();
    const bands = useSelector(store => store.bands);

    return (
        <Container maxW='container.lg'>
            <Heading>Band List</Heading>
            <Button colorScheme='green' onClick={() => history.push('/addband')}>New Band</Button>
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                {bands.map(band => {
                    return (
                        <GridItem key={band.id} borderWidth='1px' borderRadius='lg' m='lg' >
                            <Box width='container.sm'>
                                <Link to={`/bands/${band.id}`}>
                                    <Center>
                                        <Avatar size='2xl' name={band.name} src={band.band_profile_image_path} />
                                    </Center>
                                    <Center>
                                        <Text>{band.name}</Text>
                                    </Center>
                                </Link>
                            </Box>

                        </GridItem>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default BandList;