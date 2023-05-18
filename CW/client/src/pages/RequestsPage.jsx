import React, {useContext, useEffect, useState} from 'react';
import {
    Container,
    Flex,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Button
} from "@chakra-ui/react";
import {Context} from "../index";
import {findRequestId, getAllRequests, getRequestsByCustomer} from "../http/requestAPI";
import jwt_decode from "jwt-decode";
import {getAutomobiles, updateAutomobile} from "../http/automobileAPI";
import {updateOrder} from "../http/orderAPI";
import {observer} from "mobx-react-lite";

const RequestsPage = observer(() => {
    const {requests} = useContext(Context);
    const {automobiles} = useContext(Context);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwt_decode(token);
            const customerId = decodedToken.id;

            getAutomobiles().then(data => automobiles.setAutomobiles(data))

            if (!decodedToken.isManager) {
                getRequestsByCustomer(customerId)
                    .then(data => {
                        requests.setRequests(data);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setIsLoading(false);
                    });
            } else getAllRequests().then(data => {
                requests.setRequests(data);
                setIsLoading(false);
            })
        } else {
            setIsLoading(false);
        }
    }, [requests.requests]);


    const handleRequest = async (id, approved) => {

        const updateAuto = await updateAutomobile(id, approved)
        const requestId = await findRequestId(updateAuto.id)
        const request = {id: requestId.id, automobileId: updateAuto.id, customerId: requestId.customerId}
        console.log(request)
        requests.updateRequests(request)
    }

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
        <Container minW='1325px'>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Automobile</Th>
                            <Th>Customer</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {automobiles && requests.requests.map(request => (
                            <Tr key={request.id}>
                                <Td>{request.id}</Td>
                                <Td>
                                    {automobiles.getAutomobileById(request.automobileId).models.brands.brand} {automobiles.getAutomobileById(request.automobileId).models.model} ${automobiles.getAutomobileById(request.automobileId).price} {new Date(automobiles.getAutomobileById(request.automobileId).tech_details.releaseDate).getFullYear()}
                                </Td>
                                <Td>{request.customerId}</Td>
                                <Td>{automobiles.getAutomobileById(request.automobileId).approved ?
                                    <Text color='green' margin='0' padding='0'>Approved</Text> :
                                    <Text color='red' margin='0' padding='0'>Not approved</Text>}</Td>
                                {jwt_decode(localStorage.getItem('token')).isManager &&
                                    <Button
                                        variant='outline'
                                        colorScheme='green'
                                        onClick={() => handleRequest(automobiles.getAutomobileById(request.automobileId).id, true)}
                                    >
                                        Approve request
                                    </Button>
                                }
                                {jwt_decode(localStorage.getItem('token')).isManager &&
                                    <Button
                                        variant='outline'
                                        colorScheme='red'
                                        onClick={() => handleRequest(automobiles.getAutomobileById(request.automobileId).id, false)}
                                    >
                                        Reject request
                                    </Button>
                                }
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
});

export default RequestsPage;
