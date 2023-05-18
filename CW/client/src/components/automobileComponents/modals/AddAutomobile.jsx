import React, { useContext, useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    ModalBody,
    ModalHeader,
    useDisclosure,
    Select,
    Textarea,
    Alert,
    AlertIcon,
    AlertTitle,
    CloseButton, ModalFooter,
} from '@chakra-ui/react';
import ImagePicker from '../../ImagePicker';
import {
    createAutomobile,
    findModelsByBrand,
    getBodyTypes,
    getBrands,
    getEngineLayouts,
    getFuelTypes,
} from '../../../http/automobileAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import FormData from 'form-data';
import { createRequest } from '../../../http/requestAPI';
import jwt_decode from 'jwt-decode';

const AddAutomobile = observer(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { automobiles } = useContext(Context);
    const [selectedImages, setSelectedImages] = useState([]);

    const [color, setColor] = useState('');
    const [brand, setBrand] = useState(0);
    const [model, setModel] = useState(0);
    const [price, setPrice] = useState(0);
    const [mileage, setMileage] = useState(0);
    const [power, setPower] = useState(0);
    const [releaseDate, setReleaseDate] = useState('');
    const [engineSize, setEngineSize] = useState(0);
    const [fuelType, setFuelType] = useState(0);
    const [bodyType, setBodyType] = useState(0);
    const [engineLayout, setEngineLayout] = useState(0);
    const [description, setDescription] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        getBrands().then((data) => automobiles.setBrands(data));
        getFuelTypes().then((data) => automobiles.setFuelTypes(data));
        getBodyTypes().then((data) => automobiles.setBodyTypes(data));
        getEngineLayouts().then((data) => automobiles.setEngineLayouts(data));
    }, [automobiles]);

    useEffect(() => {
        if (brand) {
            findModelsByBrand(brand).then((data) => {
                automobiles.setModels(data);
            });
        }
    }, [brand]);

    const handleAlertClose = () => {
        setShowAlert(false);
        setAlertMessage('');
    };

    const sendRequestToSellCar = async () => {
        if (
            !color ||
            !price ||
            !brand ||
            !model ||
            !mileage ||
            !power ||
            !releaseDate ||
            !engineSize ||
            !fuelType ||
            !bodyType ||
            !engineLayout ||
            !description ||
            selectedImages.length === 0
        ) {
            setAlertMessage('Please enter all the required data to submit the request.');
            setShowAlert(true);
            return;
        }

        let automobileId = 0;
        let approved = jwt_decode(localStorage.getItem('token')).isManager ? 'true' : '';
        const boundary = 'blob_boundary';
        const config = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
            },
        };

        const formData = new FormData();

        try {
            selectedImages.map((image) => {
                formData.append(`images`, image);
            });

            formData.append('color', color);
            formData.append('price', price);
            formData.append('modelId', model);
            formData.append('power', power);
            formData.append('mileage', mileage);
            formData.append('releaseDate', releaseDate);
            formData.append('engineSize', engineSize);
            formData.append('fuelType', fuelType);
            formData.append('bodyType', bodyType);
            formData.append('engineLayout', engineLayout);
            formData.append('description', description);
            formData.append('approved', approved);

            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            const data = await createAutomobile(formData, config);
            automobileId = data.id;
            const request = {
                automobileId: automobileId,
                customerId: +jwt_decode(localStorage.getItem('token')).id,
            };

            if (!jwt_decode(localStorage.getItem('token')).isManager) {
                createRequest(request)
                    .then((data) => {
                        onClose();
                    })
                    .catch((err) => {
                        setAlertMessage(err);
                        setShowAlert(true);
                    });
            }
        } catch (err) {
            setAlertMessage(err);
            setShowAlert(true);
        }
    };

    return (
        <div>

            <Button mb="5px" onClick={onOpen} variant={'outline'} colorScheme="blue">
                Request to sell car
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Request to Sell Car</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {showAlert && (
                            <Alert status="error" mt={4} rounded="md">
                                <AlertIcon />
                                <AlertTitle mr={2}>{alertMessage}</AlertTitle>
                                <CloseButton onClick={handleAlertClose} position="absolute" right="8px" top="8px" />
                            </Alert>
                        )}
                        <FormControl>
                            <FormLabel>Color</FormLabel>
                            <Input
                                type="color"
                                value={color}
                                placeholder="Enter automobile's color"
                                onChange={(e) => setColor(e.target.value)}
                                height="20px"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <Input
                                type="number"
                                focusBorderColor="purple.500"
                                value={price}
                                placeholder="Enter automobile's price in $"
                                onChange={(e) => setPrice(+e.target.value)}
                                height="20px"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Brand</FormLabel>
                            <Select
                                value={brand}
                                placeholder="Enter automobile's brand"
                                onChange={(e) => setBrand(+e.target.value)}
                            >
                                {automobiles.brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.brand}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Model</FormLabel>
                            <Select
                                value={model}
                                placeholder="Enter automobile's brand to see its models"
                                onChange={(e) => setModel(+e.target.value)}
                            >
                                {automobiles.models.map((model) => (
                                    <option key={model.id} value={model.id}>
                                        {model.model}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Mileage</FormLabel>
                            <Input
                                type="number"
                                value={mileage}
                                placeholder="Enter automobile's mileage"
                                onChange={(e) => setMileage(+e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Power</FormLabel>
                            <Input
                                type="number"
                                value={power}
                                placeholder="Enter automobile's power"
                                onChange={(e) => setPower(+e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Release date</FormLabel>
                            <Input
                                type="month"
                                value={releaseDate}
                                placeholder="Enter automobile's release date"
                                onChange={(e) => setReleaseDate(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Engine size</FormLabel>
                            <Input
                                type="number"
                                step={0.1}
                                value={engineSize}
                                placeholder="Enter automobile's engine size"
                                onChange={(e) => setEngineSize(+e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Fuel type</FormLabel>
                            <Select
                                value={fuelType}
                                placeholder="Select automobile's fuel type"
                                onChange={(e) => setFuelType(+e.target.value)}
                            >
                                {automobiles.fuelTypes.map((fuelType) => (
                                    <option key={fuelType.id} value={fuelType.id}>
                                        {fuelType.fuelType}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Body type</FormLabel>
                            <Select
                                value={bodyType}
                                placeholder="Select automobile's body type"
                                onChange={(e) => setBodyType(+e.target.value)}
                            >
                                {automobiles.bodyTypes.map((bodyType) => (
                                    <option key={bodyType.id} value={bodyType.id}>
                                        {bodyType.bodyType}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Engine layout</FormLabel>
                            <Select
                                value={engineLayout}
                                placeholder="Select automobile's engine layout"
                                onChange={(e) => setEngineLayout(+e.target.value)}
                            >
                                {automobiles.engineLayouts.map((engineLayout) => (
                                    <option key={engineLayout.id} value={engineLayout.id}>
                                        {engineLayout.engineLayout}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Description:</FormLabel>
                            <Textarea
                                value={description}
                                placeholder="Write some description..."
                                onChange={(e) => setDescription(e.target.value)}
                            ></Textarea>
                        </FormControl>

                        <ImagePicker setSelectedImages={setSelectedImages} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost" onClick={sendRequestToSellCar}>
                            Add Car
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
});

export default AddAutomobile;
