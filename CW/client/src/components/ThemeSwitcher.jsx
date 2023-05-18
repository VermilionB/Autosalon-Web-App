import React, {useEffect, useState} from 'react';
import {Container, Switch, useColorMode} from "@chakra-ui/react";
const ThemeSwitcher = () => {

    const {colorMode, setColorMode} = useColorMode()
    const [delayedColorMode, setDelayedColorMode] = useState(colorMode)

    useEffect(() => {
        setTimeout(() => {
            setDelayedColorMode(colorMode);
        }, 10);
    }, [colorMode]);

    return (
        // <Container py="4">
            <Switch
                colorScheme='purple'
                color='whiteAlpha.900'
                isChecked={delayedColorMode === 'dark'}
                onChange={(e) => {
                    setColorMode(e.target.checked ? 'dark' : 'light')
                }}
                sx={{
                    alignItems: 'center',
                    fontSize: 'xl',
                    justifyContent: 'center',
                    textAlign: 'center',
                    '& > div': {
                        flex: '0 0 auto',
                    },
                }}
            >
                Dark Mode
            </Switch>
        // </Container>
    )
};

export default ThemeSwitcher;
