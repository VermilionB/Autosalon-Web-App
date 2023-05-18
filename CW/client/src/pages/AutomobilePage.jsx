import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AutomobilesList from "../components/automobileComponents/AutomobilesList";
import {
    Box, Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import AddAutomobile from "../components/automobileComponents/modals/AddAutomobile";
import {Container} from "react-bootstrap";
import {getAutomobiles} from "../http/automobileAPI";


const AutomobilePage = observer(() => {
    const {user} = useContext(Context)
    const {automobiles} = useContext(Context)
    useEffect(() => {
        getAutomobiles().then(data => automobiles.setAutomobiles(data))
    }, [])

    const [searchField, setSearchField] = useState('');
    const [priceFrom, setPriceFrom] = useState(0)
    const [priceTo, setPriceTo] = useState(automobiles.automobiles.reduce((max, obj) => (obj.price > max ? obj.price : max), -Infinity))
    const [radio, setRadio] = useState('')


    return (
        <Container bg='gray.500'>
            <Flex flexDirection='row' width='100%' mb='5px' justifyContent='space-between'>
                <Text as='h3'>All Automobiles</Text>

                    {/*<ButtonGroup>*/}
                    {/*    <Button onClick={() => setRadio('newest')}>Newest</Button>*/}
                    {/*    <Button onClick={() => setRadio('oldest')}>Oldest</Button>*/}
                    {/*</ButtonGroup>*/}
                <Box flexDirection='row'>
                    <FormControl>
                        <FormLabel>Price from</FormLabel>
                        <Input type='number' value={priceFrom} onChange={e => setPriceFrom(+e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Price to</FormLabel>
                        <Input type='number' value={+priceTo} onChange={e => setPriceTo(+e.target.value)}/>
                    </FormControl>
                </Box>
            </Flex>
            <Input
                value={searchField}
                type='text'
                placeholder='Search automobile by brand...'
                onChange={(e) => setSearchField(e.target.value)}
                mb='5px'
                />
            <SimpleGrid columns={4} spacing={5} minChildWidth='250px'>
                <AutomobilesList search={searchField} priceFrom={priceFrom} priceTo={priceTo} radio={radio}/>
            </SimpleGrid>
            {user.isAuth && (<AddAutomobile/>)}
        </Container>
    );
});

export default AutomobilePage;