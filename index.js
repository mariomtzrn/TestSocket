const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

// const { corsOptions } = require("./helpers/cors");

//Express server
const app = express();

//CORS
// app.use(cors(corsOptions));

//Body parser
app.use(express.json());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

io.on("connection", (socket) => {
  socket.emit("message", {
    message: "Welcome to the chat!",
  });
  console.log({
    clients: io.engine.clientsCount,
    currentConnection: socket.id
  });

  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

server.listen(3000, () => {
  console.log("server: ", 3000);
});