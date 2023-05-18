import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Box,
    Text,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    ModalBody,
    ModalHeader,
    useDisclosure,
    Heading,
    Textarea,
    Grid,
    GridItem, Alert, AlertIcon, AlertTitle, CloseButton,
} from '@chakra-ui/react';
import {observer} from 'mobx-react-lite';
import {Context} from '../../../index';
import jwt_decode from 'jwt-decode';
import {getAllManagers} from '../../../http/userAPI';
import {getOrdersByCustomer, makeOrder} from '../../../http/orderAPI';
import {getRequestsByCustomer} from "../../../http/requestAPI";

const MakeOrder = observer(({automobile}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [showAlert, setShowAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const [alertMessage, setAlertMessage] = useState('');
    const [disabled, setDisabled] = useState(false);

    const {managers} = useContext(Context);
    const {requests} = useContext(Context);
    const {orders} = useContext(Context)

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const customerId = decodedToken.id;

    useEffect(() => {
        getOrdersByCustomer(customerId).then(data => orders.setOrders(data))
        getAllManagers().then((data) => managers.setManagers(data));
        getRequestsByCustomer(jwt_decode(localStorage.getItem('token')).id).then(data => requests.setRequests(data))
    }, []);

    const getRandomManager = (managers) => {
        const randomIndex = Math.floor(Math.random() * managers.length);
        return managers[randomIndex];
    };

    const handleAlertClose = () => {
        setShowAlert(false);
        setShowSuccessAlert(false)
    };

    const checkOrderedAutomobile = (automobile) => {

        let orderedAutomobile = requests.requests.find((request) => request.automobileId === automobile.id && request.customerId === customerId) || orders.orders.find((order) => order.automobileId === automobile.id && order.customerId === customerId);

        if (orderedAutomobile) {
            setDisabled(true);
            console.log('Automobile is already ordered', disabled)
        }
    }

    useEffect(() => {
        checkOrderedAutomobile(automobile);
    }, [automobile]);

    const sendOrder = async () => {
        try {
            const order = {
                customerId: jwt_decode(localStorage.getItem('token')).id,
                managerId: getRandomManager(managers.managers).id,
                automobileId: automobile.id,
                totalPrice: automobile.price,
                date: new Date(),
            };

            makeOrder(order).then((data) => onClose());
            setAlertMessage('You successfully made an order')
            setShowSuccessAlert(true)

        } catch (err) {
            setAlertMessage(err);
            setShowAlert(true);
        }
    };

    return (
        <div>
            {showAlert && (
                <Alert status="error" mt={4} rounded="md">
                    <AlertIcon/>
                    <AlertTitle mr={2}>{alertMessage}</AlertTitle>
                    <CloseButton onClick={handleAlertClose} position="absolute" right="8px" top="8px"/>
                </Alert>
            )}

            {showSuccessAlert &&
                <Alert status='success' variant='subtle' mt={4} rounded="md">
                    <AlertIcon/>
                    <AlertTitle mr={2}>{alertMessage}</AlertTitle>
                    <CloseButton onClick={handleAlertClose} position="absolute" right="8px" top="8px"/>
                </Alert>
            }

            <Button mt="5px" onClick={onOpen} isDisabled={disabled} variant="outline" colorScheme="blue">
                Order automobile
            </Button>


            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Order details</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            <GridItem>
                                <Heading as="h4" size="md">
                                    Brand:
                                </Heading>
                            </GridItem>
                            <GridItem>
                                <Text>{automobile.models.brands.brand}</Text>
                            </GridItem>

                            <GridItem>
                                <Heading as="h4" size="md">
                                    Model:
                                </Heading>
                            </GridItem>
                            <GridItem>
                                <Text>{automobile.models.model}</Text>
                            </GridItem>

                            <GridItem>
                                <Heading as="h4" size="md">
                                    Color:
                                </Heading>
                            </GridItem>
                            <GridItem>
                                <Box bg={automobile.color} w="20px" h="20px" borderRadius="md"/>
                            </GridItem>

                            <GridItem>
                                <Heading as="h4" size="md">
                                    Power:
                                </Heading>
                            </GridItem>
                            <GridItem>
                                <Text>{automobile.tech_details.power}</Text>
                            </GridItem>

                            <GridItem>
                                <Heading as="h4" size="md">
                                    Mileage:
                                </Heading>
                            </GridItem>
                            <GridItem>
                                <Text>{automobile.tech_details.mileage}</Text>
                            </GridItem>

                            <GridItem>
                                <Heading as="h4" size="md">
                                    Engine size:
                                </Heading>
                            </GridItem>
                            <GridItem>
                                <Text>{automobile.tech_details.engineSize}</Text>
                            </GridItem>

                            <GridItem>
                                <Heading as="h4" size="md">
                                    Fuel type:
                                </Heading>
                            </GridItem>
                            <GridItem>
                                <Text>{automobile.tech_details.fuel_types.fuelType}</Text>
                            </GridItem>

                            <GridItem>
                                <Heading as="h4" size="md">
                                    Body type:
                                </Heading>
                            </GridItem>
                            <GridItem>
                                <Text>{automobile.tech_details.body_types.bodyType}</Text>
                            </GridItem>

                            <GridItem>
                                <Heading as="h4" size="md">
                                    Engine layout:
                                </Heading>
                            </GridItem>
                            <GridItem>
                                <Text>{automobile.tech_details.engine_layouts.engineLayout}</Text>
                            </GridItem>

                            <GridItem>
                                <Heading as="h4" size="md">
                                    Price:
                                </Heading>
                            </GridItem>
                            <GridItem>
                                <Text>${automobile.price}</Text>
                            </GridItem>

                            <GridItem colSpan={2}>
                                <Heading as="h4" size="md">
                                    Description:
                                </Heading>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <Textarea isReadOnly={true}>{automobile.description}</Textarea>
                            </GridItem>
                        </Grid>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost" onClick={sendOrder} disabled={disabled}>
                            Make order
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
});

export default MakeOrder;
