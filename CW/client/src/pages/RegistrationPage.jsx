import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { Box, Button, FormControl, FormErrorMessage, Input, Link, Stack, Alert } from '@chakra-ui/react';

const RegistrationPage = observer(({ isLogin }) => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [formErrors, setFormErrors] = useState({
        email: false,
        password: false,
        phone: false,
        name: false,
        surname: false,
    });
    const [error, setError] = useState('');

    const validateForm = () => {
        const errors = {
            email: email.trim() === '',
            password: password.trim() === '',
            phone: phone.trim() === '',
            name: name.trim() === '',
            surname: surname.trim() === '',
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
                data = await registration(email, password, phone, surname, name);
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

            <FormControl isRequired isInvalid={formErrors.email}>
                <Input
                    className="mt-3"
                    placeholder="Enter email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.email && <FormErrorMessage type="invalid">Email is required</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired isInvalid={formErrors.password}>
                <Input
                    className="mt-3"
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                {formErrors.password && <FormErrorMessage type="invalid">Password is required</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired isInvalid={formErrors.phone}>
                <Input
                    className="mt-3"
                    placeholder="Enter phone..."
                    type="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                {formErrors.phone && <FormErrorMessage type="invalid">Phone is required</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired isInvalid={formErrors.name}>
                <Input
                    className="mt-3"
                    placeholder="Enter name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {formErrors.name && <FormErrorMessage type="invalid">Name is required</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired isInvalid={formErrors.surname}>
                <Input
                    className="mt-3"
                    placeholder="Enter surname..."
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                {formErrors.surname && <FormErrorMessage type="invalid">Surname is required</FormErrorMessage>}
            </FormControl>

            <Stack style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                {isLogin ? (
                    <div>
                        No account?
                        <Link color="purple.400" style={{ marginLeft: '5px' }}>
                            <NavLink to={REGISTRATION_ROUTE}>Sign Up!</NavLink>
                        </Link>
                    </div>
                ) : (
                    <div>
                        Already have an account?
                        <Link color="purple.400" style={{ marginLeft: '5px' }}>
                            <NavLink to={LOGIN_ROUTE}>Sign In!</NavLink>
                        </Link>
                    </div>
                )}
                <Button colorScheme={'twitter'} ml="auto" onClick={() => click()}>
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </Button>
            </Stack>
        </Box>
    );
});

export default RegistrationPage;
