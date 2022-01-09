const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const redis = require("redis");

// Environment variables
require("dotenv").config();

// Redis
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_DB = process.env.REDIS_DB;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}/${REDIS_DB}`,
});

redisClient.on("connect", function () {
  console.log("connected");
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

// Subscribe to chat channel
redisClient.subscribe("chat");

// Server
const app = express();
app.set("port", 3001);

const httpServer = http.createServer(app);

const io = new socketIO.Server(httpServer, {});

io.sockets.on("connection", (socket) => {
  redisClient.on("message", (channel, message) => {
    console.log({ message, channel });
    socket.send(message);
  });

  socket.on("send_message", (body) => {
    console.log("Message in send_message: ", body);
    const values = {
      comment: body.msg,
    };

    const options = {
      host: process.env.DJANGO_HOST,
      port: process.env.DJANGO_PORT,
      path: "/v1/chat/send_message/",
      headers: {
        "X-Socket-Token": "Custom auth token",
      },
    };

    // Send message to Django
    const req = http.request(options, (res) => {
      res.on("data", (message) => {
        console.log("message on data django: ", message);
      });
    });

    req.write(values);
    req.end();
  });
});

// Initialize the server
const port = app.get("port");
httpServer.listen(port, () => {
  console.clear();
  console.log(`Listening on port ${port}`);
});
