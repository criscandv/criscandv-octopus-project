const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const redis = require("redis");
const querystring = require("querystring");
const axios = require("axios");

// Environment variables
require("dotenv").config();

// Server
const app = express();
app.set("port", 3001);
app.use(express.json());
app.use(cors());

// Redis
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_DB = process.env.REDIS_DB;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

// const redisClient = redis.createClient({
//   host: "redis",
//   port: REDIS_PORT,
//   db: REDIS_DB,
// });
(async () => {
  const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on("error", (err) => {
    console.log("Redis Client Error", err);
    return;
  });

  await redisClient.connect();

  app.use(express.urlencoded({ extended: true }));

  const httpServer = http.createServer(app);

  const io = new socketIO.Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.sockets.on("connection", async (socket) => {
    // Subscribe to chat channel
    await redisClient.subscribe("chat", (message) => {
      console.log("Message redis", { message });
      // socket.send(message);
    });

    socket.on("send_message", (body) => {
      const values = querystring.stringify({
        message: body.message,
        user_from: body.user,
        user_to: "ccano",
      });

      const options = {
        host: process.env.DJANGO_HOST,
        port: process.env.DJANGO_PORT,
        path: "/v1/chat/send_message/",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Socket-Token": "Custom auth token",
          "Content-Length": values.length,
        },
      };

      // Send message to Django
      const req = http.request(options, (res) => {
        res.on("data", (message) => {
          // console.log(`message on data django: ${message}`);
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
})();
