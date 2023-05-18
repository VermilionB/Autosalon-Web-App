import React from 'react';
import {Avatar, Container, Flex, Heading, Stack} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";

const UserPage = observer(() => {
    return (
        <Container maxW='650px' bg='whiteAlpha.400' padding='0'>
            <Heading>My Account</Heading>
            <Stack>
                <Avatar name={jwt_decode(localStorage.getItem('token')).name} size="sm" bg='purple.500'/>
                <Flex alignItems='center' flexDirection='column' gap={2}>
                    <Flex size='sm'
                          color='whiteAlpha.900'>{jwt_decode(localStorage.getItem('token')).name} {jwt_decode(localStorage.getItem('token')).surname}</Flex>
                    <Flex color='whiteAlpha.900'>{jwt_decode(localStorage.getItem('token')).email}</Flex>
                    <Flex color='whiteAlpha.900'>{jwt_decode(localStorage.getItem('token')).id}</Flex>
                </Flex>
            </Stack>
        </Container>
    );
});

export default UserPage;