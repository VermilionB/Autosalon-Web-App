import React from 'react';
import {observer} from "mobx-react-lite";
import {Container, Heading} from "@chakra-ui/react";


const MainPage = observer(() => {

    return (
        <Container centerContent='true' alignContent='center' minH='50vh' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Heading>Welcome to Royal Cars</Heading>
        </Container>
    );
});

export default MainPage;