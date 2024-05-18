import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import 'dotenv/config';
import { Server } from "socket.io";
import connectToDB from "./config/dbConfig.js";
import userRouter from "./routes/user.route.js";
import msgRouter from "./routes/message.route.js";

const app = express();

const corsConfig = {
    exposedHeaders: ['Authorization']
};
app.use(cors(corsConfig));
app.use(bodyParser.json());

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on('sendMessage', (data) => {
        socket.broadcast.emit('message', { text: data.text, isSentByUs: false, username: data.username });
    });

    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id);
    });
});

app.get('/api', (req, res) => {
    return res.status(200).send({ message: 'API is working' });
});

// Routes
app.use('/api', userRouter);
app.use('/api', msgRouter)

// Connect to the database
connectToDB();

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
