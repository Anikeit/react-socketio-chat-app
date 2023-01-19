const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.sendStatus(200)
})

const io = new Server(server, {
  cors: {
    origin: "https://63c8e1c6d4d03c299c73472f--classy-liger-d9aa45.netlify.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
  });
});

server.listen(3001, () => {
  console.log("Server Running")
})