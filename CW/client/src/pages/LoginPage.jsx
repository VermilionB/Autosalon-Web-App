import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { Context } from '../index';
import {Alert, Box, Button, FormControl, Input, Link, Stack} from '@chakra-ui/react';

const LoginPage = observer(({ isLogin }) => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false,
    });
    const [error, setError] = useState('');

    const validateForm = () => {
        const errors = {
            email: email.trim() === '',
            password: password.trim() === '',
        };
        setFormErrors(errors);
        return Object.values(errors).every((error) => !error);
    };

    const click = async () => {
        try {
            if (!validateForm()) {
                return;
            }
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user);
            user.setIsAuth(true);
            navigate(MAIN_ROUTE);
        } catch (e) {
            setError(e.response.data.message);
        }
    };

    return (
        <Box>
            {error && (
                <Alert status="error" variant="subtle">
                    {error}
                </Alert>
            )}

            <FormControl isInvalid={formErrors.email}>
                <Input
                    className="mt-3"
                    placeholder="Enter email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            {formErrors.email && (
                <Box color="red" fontSize="sm" mt={1}>
                    Email is required
                </Box>
            )}

            <FormControl isInvalid={formErrors.password}>
                <Input
                    className="mt-3"
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
            </FormControl>
            {formErrors.password && (
                <Box color="red" fontSize="sm" mt={1}>
                    Password is required
                </Box>
            )}

            <Stack
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                {isLogin ? (
                    <div>
                        No account?{' '}
                        <Link color="purple.400" style={{ marginLeft: '5px' }}>
                            <NavLink to={REGISTRATION_ROUTE}>Sign Up!</NavLink>
                        </Link>
                    </div>
                ) : (
                    <div>
                        Already have an account? <NavLink to={LOGIN_ROUTE}>Sign In!</NavLink>
                    </div>
                )}
                <Button variant="outline" colorScheme="twitter" ml="auto" onClick={() => click()}>
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </Button>
            </Stack>
        </Box>
    );
});

export default LoginPage;
