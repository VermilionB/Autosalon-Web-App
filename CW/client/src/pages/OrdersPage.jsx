import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {
    Table,
    TableContainer,
    Thead,
    Tr,
    Td,
    Th,
    Container,
    Flex,
    Spinner,
    Text,
    Tbody,
    Button
} from "@chakra-ui/react";
import {Context} from "../index";
import jwt_decode from "jwt-decode";
import {getAutomobiles} from "../http/automobileAPI";
import {getAllOrders, getOrdersByCustomer, updateOrder} from "../http/orderAPI";
import {getAllManagers} from "../http/userAPI";

const OrdersPage = observer(() => {
    const {orders} = useContext(Context);
    const {managers} = useContext(Context);
    const {user} = useContext(Context);

    const {automobiles} = useContext(Context);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwt_decode(token);
            const customerId = decodedToken.id;

            getAllManagers().then(data => managers.setManagers(data));
            getAutomobiles().then(data => automobiles.setAutomobiles(data));

            if (!decodedToken.isManager) {
                getOrdersByCustomer(customerId)
                    .then(data => {
                        orders.setOrders(data);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setIsLoading(false);
                    });
            } else getAllOrders().then(data => {
                orders.setOrders(data);
                setIsLoading(false);
            })
            console.log(orders.orders)
        } else {
            setIsLoading(false);
        }
    }, [orders.orders]);

    const fetchStatus = (statusCode) => {
        if (statusCode === 0) {
            return 'Pending'
        } else if (statusCode === 1) {
            return 'Accepted'
        } else if (statusCode === -1) {
            return 'Rejected'
        }
    }

    const acceptOrder = async (order) => {
        await updateOrder(order.id, 1).then(data => console.log(data))
        orders.updateOrders(order)
    }

    const rejectOrder = async (order) => {
        await updateOrder(order.id, -1).then(data => console.log(data))
        orders.updateOrders(order)
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
            <TableContainer style={{margin: 0}}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Order date</Th>
                            <Th>Total price</Th>
                            <Th>Customer</Th>
                            <Th>Manager</Th>
                            <Th>Automobile</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {automobiles && orders.orders.length > 0 && orders.orders.map(order => (
                            <Tr key={order.id}>
                                <Td>{order.id}</Td>
                                <Td>{order.date}</Td>
                                <Td>{order.totalPrice}</Td>
                                <Td>{order.customerId}</Td>
                                <Td>{order.managerId}</Td>
                                <Td>{order.automobileId}</Td>
                                <Td>
                                    {order.status === 0 ?
                                        <Text color='yellow' margin='0' padding='0'>{fetchStatus(order.status)}</Text>
                                        : order.status === 1 ? <Text color='green' margin='0'
                                                                     padding='0'>{fetchStatus(order.status)}</Text>
                                            :
                                            <Text color='red' margin='0' padding='0'>{fetchStatus(order.status)}</Text>
                                    }
                                </Td>
                                {jwt_decode(localStorage.getItem('token')).isManager &&
                                    <Button
                                        variant='outline'
                                        colorScheme='green'
                                        onClick={() => acceptOrder(order)}
                                    >
                                        Accept order
                                    </Button>
                                }
                                {jwt_decode(localStorage.getItem('token')).isManager &&
                                    <Button
                                        variant='outline'
                                        colorScheme='red'
                                        onClick={() => rejectOrder(order)}
                                    >
                                        Reject order
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

export default OrdersPage;