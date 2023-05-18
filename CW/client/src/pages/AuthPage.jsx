import React from 'react';
import {Card, Container} from "@chakra-ui/react";

import {useLocation} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";

const Auth = observer(() => {
    const location = useLocation()

    const isLogin = location.pathname === LOGIN_ROUTE

    return (
        <Container
            style={{height: window.innerHeight - 54, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '35%'}}
        >
            <Card style={{width: 600, padding: '50px'}} borderRadius={'lg'}>
                <h2 align="center">{isLogin ? 'Sign In' : "Sign Up"}</h2>
                {isLogin ? <LoginPage isLogin={isLogin}/> : <RegistrationPage isLogin={isLogin}/>}
            </Card>
        </Container>
    );
});

export default Auth;