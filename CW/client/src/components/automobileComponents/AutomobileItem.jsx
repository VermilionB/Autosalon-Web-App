import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Heading, Stack, Image, Box, CardBody, CardFooter} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imgNotFound from '../../assets/carnotfound.jpg'
import {useColorModeValue} from "@chakra-ui/react";
import '../../App.css'
import {useNavigate} from "react-router-dom";
import {AUTOMOBILE_ROUTE} from "../../utils/consts";

const AutomobileItem = observer(({automobile}) => {
    const bgColor = useColorModeValue('purple.600', 'purple.500')
    const navigate = useNavigate()

    return (
        <Card display="flex" flexDirection="column" height="100%" borderWidth='1px' borderColor={bgColor}
              >
            <Box flex="1" className="imageCover">
                {automobile.images.length > 0 ? (
                    <Carousel infiniteLoop  stopOnHover='false' dynamicHeight='false' showThumbs={false}>
                        {automobile.images.map((slide) => {
                            return (
                                <Image
                                    style={{maxHeight: '300px'}}
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
            <Box>
                <CardBody onClick={() => navigate(AUTOMOBILE_ROUTE + '/' + automobile.id)} cursor='pointer'>
                    <Stack mt="6" spacing="3">
                        <Heading size="md">
                            {automobile.models.brands.brand} {automobile.models.model}{' '}
                            {new Date(automobile.tech_details.releaseDate).getFullYear()}
                        </Heading>
                        <Text>Price ${automobile.price}</Text>
                    </Stack>
                </CardBody>

            </Box>
        </Card>
    );
});

export default AutomobileItem;