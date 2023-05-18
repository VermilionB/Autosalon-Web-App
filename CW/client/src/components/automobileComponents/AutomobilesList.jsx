import {getApprovedAutomobiles, getAutomobiles} from "../../http/automobileAPI";
import jwt_decode from "jwt-decode";
import {Box, Flex, Input, Spinner} from "@chakra-ui/react";
import AutomobileItem from "./AutomobileItem";
import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const AutomobileList = observer(({search, priceFrom, priceTo, radio}) => {
    const {automobiles} = useContext(Context);
    const {user} = useContext(Context);

    const [filteredAutomobiles, setFilteredAutomobiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (!user.isAuth) {
            getApprovedAutomobiles().then((data) => {
                automobiles.setAutomobiles(data);
                setIsLoading(false);
            });
        } else {
            if (jwt_decode(localStorage.getItem('token')).isManager) {
                getAutomobiles().then((data) => {
                    automobiles.setAutomobiles(data);
                    setIsLoading(false);
                });
            } else {
                getApprovedAutomobiles().then((data) => {
                    automobiles.setAutomobiles(data);
                    setIsLoading(false);
                });
            }
        }
    }, []);

    useEffect(() => {

    }, [search, automobiles.automobiles]);

    useEffect(() => {
        const filtered = automobiles.automobiles.filter((automobile) =>
                (
                    automobile.price >= priceFrom && automobile.price <= priceTo
                ) && (
                    automobile.models.brands.brand.toLowerCase() || '').includes(search.toLowerCase()
                ) && (
                    automobiles.automobiles.sort((a1, a2) =>
                        radio.value === 'newest' ? Number(a1.tech_details.releaseDate) - Number(a2.tech_details.releaseDate) : Number(a2.tech_details.releaseDate) - Number(a1.tech_details.releaseDate)
                    )
                )
        );
        setFilteredAutomobiles(filtered);
    }, [priceFrom, priceTo, search, radio, automobiles.automobiles])

    if (isLoading) {
        return <Flex
            style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: window.screen.height - 154}}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='purple.600'
                size='xl'
            />
        </Flex>

    }

    return (
        <>
            {filteredAutomobiles.map((automobile) => (
                <Box mb='5px' key={automobile.id}>
                    <AutomobileItem automobile={automobile}/>
                </Box>
            ))}

        </>
    );
});

export default AutomobileList
