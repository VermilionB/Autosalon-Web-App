import {useEffect, useState} from "react"
import io from "socket.io-client"
import jwt_decode from "jwt-decode";
import {Button, Card, Container, FormControl, Heading, Input, Text} from "@chakra-ui/react";

const socket = io.connect("http://localhost:5001")
const ChatForm = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        socket.emit("sendmessage", {
            message: message,
            user: jwt_decode(localStorage.getItem('token')).email
        })
    }

    useEffect(() => {
        socket.on("sendmessage", data => {
            setMessages([...messages, data]);
        })
    }, [messages])

    return (
        <Container centerContent='true' alignContent='center' minH='50vh'>

            <Heading>Chat</Heading>

            {messages.map((message) => {
                return (
                    <Card width='100%' borderWidth='1px' borderColor='purple.500' margin='5px' padding='10px'>
                        <Text>Message: {message.message}</Text>
                        <Text>User: {message.user}</Text>
                    </Card>
                );
            })}

            <FormControl flexDirection='row'>
                <Input
                    placeholder='Write message...'
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }}
                    maxLength={80}
                    value={message}
                ></Input>
                <Button
                    mt='5px'
                    colorScheme='purple'
                    variant='outline'
                    onClick={() => {
                        sendMessage();
                        setMessage('');
                    }}
                >
                    Send
                </Button>

            </FormControl>
        </Container>
    )
}

export default ChatForm;