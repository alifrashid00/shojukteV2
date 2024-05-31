import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    }
})


const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
        // Store userId on the socket object
        socket.userId = userId;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        // Access userId from the socket object
        const disconnectedUserId = socket.userId;
        if (disconnectedUserId) {
            delete userSocketMap[disconnectedUserId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

export { app, io, server };
