import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Box, Center, Flex, Heading, Button, Grid, GridItem, Text, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

function BandList() {
    const history = useHistory();
    const bands = useSelector(store => store.bands);

    return (
        <Center>
            <Box layerStyle={'outerContainer'} >
                <Flex>
                    <Text textStyle={'pageHeader'}>Band List</Text>
                    <Spacer />
                    <Button size='lg' leftIcon={<AddIcon />} colorScheme='green' onClick={() => history.push('/addband')}>New Band</Button>
                </Flex>
                <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                    {bands.map(band => {
                        return (
                            <GridItem key={band.id} borderWidth='1px' borderRadius='lg' m='lg' >
                                <Box>
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
            </Box>
        </Center>
    )
}

export default BandList;