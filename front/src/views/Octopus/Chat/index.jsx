import React, { useState, useEffect } from "react";
import {
  ListItem,
  UnorderedList,
  Container,
  Text,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";

import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

function Chat() {
  const [chatUser, setChatUser] = useState("");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    {
      message: "m1 u1 Harcode",
      user: "user1",
    },
    {
      message: "m1 u2 Harcode",
      user: "user2",
    },
  ]);

  useEffect(() => {
    socket.on("connect", function () {
      console.log("Socket connected");
    });

    socket.on("message", (message) => {
      console.log({ message });
      if (message) {
        console.log("Recibiendo mensaje");
      }
    });
  }, [socket]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setChatUser(user);
  }, []);

  const handleUsername = (e) => {
    const { value } = e.target;
    setChatUser(value);
  };

  const setUserLocal = () => {
    localStorage.setItem("user", chatUser);
    location.reload();
  };

  const handleMessage = (e) => {
    const { value } = e.target;
    setMsg(value);
  };

  const handleSubmit = () => {
    if (!msg) {
      alert("Text required");
      return;
    }
    const data = {
      user: chatUser,
      message: msg,
    };

    socket.emit("send_message", data, (response) => {
      console.log({ response });
    });
  };

  const logoutChat = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <Container mt="10">
      {chatUser ? (
        <Box>
          <Text fontSize="3xl" align="center">
            Welcome to Octopus chat
          </Text>
          <Text fontSize="1xl" align="center">
            Connected as: {chatUser}
          </Text>
          <Box>
            <UnorderedList>
              {messages.map((item, idx) => (
                <ListItem key={idx}>
                  {item.user}: {item.message}
                </ListItem>
              ))}
            </UnorderedList>

            <Input placeholder="Basic usage" onChange={handleMessage} mb="2" />
            <Button colorScheme="blue" onClick={handleSubmit}>
              Send
            </Button>
            <Button colorScheme="red" onClick={logoutChat} ml="2">
              Logout
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Text fontSize="3xl" align="center">
            Set user to start chatting
          </Text>
          <Box>
            <Input placeholder="User" onChange={handleUsername} mb="1" />
            <Button colorScheme="blue" onClick={setUserLocal}>
              Login
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default Chat;
