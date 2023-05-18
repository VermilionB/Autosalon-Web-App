import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Button, Card,
    Container,
    Flex,
    Heading,
    HStack,
    Image,
    Stack,
    Textarea, useColorModeValue,
} from "@chakra-ui/react";
import {Carousel} from "react-responsive-carousel";
import {getOneAutomobile} from "../http/automobileAPI";
import {useParams} from "react-router-dom";
import '../App.css'
import imgNotFound from "../assets/carnotfound.jpg";
import MakeOrder from "../components/orderComponents/modal/MakeOrder";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const AutomobileInfoPage = observer(() => {
    const {user} = useContext(Context)
    const [automobile, setAutomobile] = useState(null);
    const {id} = useParams()

    const borderColor = useColorModeValue('purple.400', 'purple.500')

    useEffect(() => {
        getOneAutomobile(id).then(data => setAutomobile(data))
    }, [automobile, id])

    return (
        <Container maxW='1295px' padding='0' showThumbs={false}>
            <Card width='100%' borderRadius='sm' borderWidth='1px' borderColor={borderColor}>
                {automobile && (
                    <Flex flexDirection='column'>
                        <Flex flexDirection='row'>
                            <HStack style={{width: '70%'}} justifyContent='center'>
                                <Box flex="1" className="imageCover">
                                    {automobile.images.length > 0 ? (
                                        <Carousel infiniteLoop stopOnHover='false' dynamicHeight='false' width='400px'>
                                            {automobile.images.map((slide) => {
                                                return (
                                                    <Image
                                                        src={process.env.REACT_APP_API_URL + slide.image}
                                                        height="100%"
                                                        width="100%"
                                                        objectFit="cover"
                                                        alt={slide.image}
                                                        borderRadius="lg"
                                                    />
                                                );
                                            })}
                                        </Carousel>
                                    ) : (
                                        <Image
                                            src={imgNotFound}
                                            style={{height: '100%', width: '100%'}}
                                            objectFit="cover"
                                            alt="No images were found"
                                            borderRadius="lg"
                                        />
                                    )}
                                </Box>
                            </HStack>
                            <HStack style={{width: '30%'}} bg='whiteAlpha.200' flexDirection='column'>
                                <Flex flexDirection='column' width='100%' padding='10px' justifyContent='center'>
                                    <Heading size='lg' style={{margin: 0}}>
                                        Automobile details
                                    </Heading>
                                    <Stack justifyContent="space-between" flexDirection='row' width='100%'>
                                        <Heading size='md' style={{margin: 0}}>
                                            Brand
                                        </Heading>
                                        <Heading size='md' style={{margin: 0}}>
                                            {automobile.models.brands.brand}
                                        </Heading>
                                    </Stack>
                                    <Stack justifyContent="space-between" flexDirection='row' width='100%'
                                           style={{margin: 0}}>
                                        <Heading size='md' style={{margin: 0}}>
                                            Model
                                        </Heading>
                                        <Heading size='md' style={{margin: 0}}>
                                            {automobile.models.model}
                                        </Heading>
                                    </Stack>
                                    <Stack justifyContent="space-between" flexDirection='row' width='100%'
                                           style={{margin: 0}}>
                                        <Heading size='md' style={{margin: 0}}>
                                            Color
                                        </Heading>
                                        <Box bg={automobile.color} style={{margin: 0, width: '50px', height: '100%'}}/>
                                    </Stack>
                                    <Stack justifyContent="space-between" flexDirection='row' width='100%'
                                           style={{margin: 0}}>
                                        <Heading size='md' style={{margin: 0}}>
                                            Power
                                        </Heading>
                                        <Heading size='md' style={{margin: 0}}>
                                            {automobile.tech_details.power}
                                        </Heading>
                                    </Stack>
                                    <Stack justifyContent="space-between" flexDirection='row' width='100%'
                                           style={{margin: 0}}>
                                        <Heading size='md' style={{margin: 0}}>
                                            Mileage
                                        </Heading>
                                        <Heading size='md' style={{margin: 0}}>
                                            {automobile.tech_details.mileage}
                                        </Heading>
                                    </Stack>
                                    <Stack justifyContent="space-between" flexDirection='row' width='100%'
                                           style={{margin: 0}}>
                                        <Heading size='md' style={{margin: 0}}>
                                            Engine size
                                        </Heading>
                                        <Heading size='md' style={{margin: 0}}>
                                            {automobile.tech_details.engineSize}
                                        </Heading>
                                    </Stack>
                                    <Stack justifyContent="space-between" flexDirection='row' width='100%'
                                           style={{margin: 0}}>
                                        <Heading size='md' style={{margin: 0}}>
                                            Fuel type
                                        </Heading>
                                        <Heading size='md' style={{margin: 0}}>
                                            {automobile.tech_details.fuel_types.fuelType}
                                        </Heading>
                                    </Stack>
                                    <Stack justifyContent="space-between" flexDirection='row' width='100%'
                                           style={{margin: 0}}>
                                        <Heading size='md' style={{margin: 0}}>
                                            Body type
                                        </Heading>
                                        <Heading size='md' style={{margin: 0}}>
                                            {automobile.tech_details.body_types.bodyType}
                                        </Heading>
                                    </Stack>
                                    <Stack justifyContent="space-between" flexDirection='row' width='100%'
                                           style={{margin: 0}}>
                                        <Heading size='md' style={{margin: 0}}>
                                            Engine layout
                                        </Heading>
                                        <Heading size='md' style={{margin: 0}}>
                                            {automobile.tech_details.engine_layouts.engineLayout}
                                        </Heading>
                                    </Stack>
                                    <Stack justifyContent="space-between" flexDirection='row' width='100%'
                                           style={{margin: 0}}>
                                        <Heading size='md' style={{margin: 0}}>
                                            Price
                                        </Heading>
                                        <Heading size='md' style={{margin: 0}}>
                                            ${automobile.price}
                                        </Heading>
                                    </Stack>
                                </Flex>
                            </HStack>
                        </Flex>

                        <Flex flexDirection='column' margin='5px' justifyContent='flex-end'>
                            <Textarea readOnly='true' resize='false'>
                                {automobile.description}
                            </Textarea>
                            {user.isAuth &&
                                <Flex direction="row" justifyContent="flex-end" marginTop='5px'>
                                    <MakeOrder automobile={automobile}/>
                                </Flex>
                            }

                        </Flex>
                    </Flex>

                )}
            </Card>
        </Container>
    );
});

export default AutomobileInfoPage;