const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const {Server} = require("socket.io")

const io = new Server(server,{
    cors: {
        origin: "*",
        methods: "*"
    }
});
app.use(cors());

app.get('/',(_,res) => {
    res.send({ok: true});
});

server.listen(3000,() => {
    console.log("Server started")
});

io.on("connection",socket => {
    console.log("Connected");
    socket.emit("hi")
    socket.on("stream", ({id,data}) => {
        console.log(id)
        io.sockets.emit("audio-input",{
            id,
            buffer: data
        })
    })
});