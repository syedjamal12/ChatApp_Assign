import { error } from "console";
import { produceMessage } from "./helper.js";
export function setupSocket(io) {
    io.use((socket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
            return next(new error("Invalid room"));
        }
        socket.room = room;
        next();
    });
    io.on("connection", (socket) => {
        socket.join(socket.room);
        socket.on("message", async (data) => {
            console.log("server side msg coming>>>", data);
            await produceMessage(process.env.KAFKA_TOPIC, data);
            socket.to(socket.room).emit("message", data);
        });
        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
        });
    });
}
