import React, {useContext, useEffect, useState} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {
    ADMIN_ROUTE,
    AUTOMOBILE_ROUTE, CHAT_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    ORDERS_ROUTE,
    REQUESTS_ROUTE,
    USER_ROUTE
} from "../utils/consts";
import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Menu,
    MenuButton,
    MenuItem, MenuList,
    Spacer,
    Switch,
    Text
} from "@chakra-ui/react";
import {Context} from "../index";
import '../App.css'

import {useColorMode} from "@chakra-ui/react";
import ThemeSwitcher from "./ThemeSwitcher";
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";


export const Header = observer(() => {
    const {user} = useContext(Context)
    const [userToken, setUserToken] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        try {
            if (localStorage.getItem('token')) {
                setUserToken(jwt_decode(localStorage.getItem('token')))
                console.log(userToken.isManager)
            } else {
                setUserToken({})
            }
        } catch (err) {

        }

    }, [])

    useEffect(() => {
        try {
            if (localStorage.getItem('token')) {
                setUserToken(jwt_decode(localStorage.getItem('token')))
                console.log(userToken.isManager)
            } else {
                setUserToken({})
            }
        } catch (err) {

        }

    }, [localStorage.getItem('token')])

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        navigate(MAIN_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Royal Cars</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to={AUTOMOBILE_ROUTE}>Automobiles</Nav.Link>
                    {user.isAuth &&
                        <Nav.Link as={Link} to={ORDERS_ROUTE}>
                            {userToken.isManager ? 'All Orders' : 'My Orders'}
                        </Nav.Link>
                    }
                    {user.isAuth &&
                        <Nav.Link as={Link} to={REQUESTS_ROUTE}>
                            {userToken.isManager ? 'All Requests' : 'My Requests'}
                        </Nav.Link>
                    }

                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    {user && userToken.isManager &&
                        <Text as='h5' mr='30px' color='green.200'>Admin page</Text>
                    }
                    <ThemeSwitcher/>

                    {user.isAuth ?
                        <Nav className="ml-auto align-items-lg-end" style={{color: 'white'}}>
                            <Button
                                variant={"outline-light"}
                                onClick={() => logOut()}
                            >
                                Log Out
                            </Button>
                        </Nav>
                        :
                        <Nav>
                            <Button variant='ghost' colorScheme='purple' color='whiteAlpha.900' ml='5px' onClick={() => navigate(LOGIN_ROUTE)}>Sign In</Button>
                        </Nav>
                    }


                    {user.isAuth &&
                        <Menu>
                            <MenuButton>
                                <Flex alignItems='center' flexWrap='wrap' style={{height: '100%! important'}}>

                                    <Avatar name={userToken.name} size="sm" bg='purple.500'/>
                                    <Spacer width='5px'/>

                                    <Flex alignItems='center' flexDirection='column' gap={2}>
                                        <Flex size='sm'
                                              color='whiteAlpha.900'>{userToken.name} {userToken.surname}</Flex>
                                        <Flex color='whiteAlpha.900'>{userToken.email}</Flex>

                                    </Flex>
                                </Flex>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Nav.Link as={Link} to={USER_ROUTE}>
                                        My Account
                                    </Nav.Link>
                                </MenuItem>
                                <MenuItem>
                                    <Nav.Link as={Link} to={AUTOMOBILE_ROUTE}>
                                        Automobiles
                                    </Nav.Link>
                                </MenuItem>
                                <MenuItem>
                                    <Nav.Link as={Link} to={CHAT_ROUTE}>
                                        Chat
                                    </Nav.Link></MenuItem>
                                <MenuItem>About us</MenuItem>
                            </MenuList>
                        </Menu>

                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})
