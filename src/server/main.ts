/* eslint-disable @typescript-eslint/no-unused-vars */
import { encodeData } from "../assets/utils";
import ViteExpress from "vite-express";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = app.listen(5173, "0.0.0.0", () => console.log("Server is listening..."));
const io = new Server(server, {});

// Store the weightedRandomConfig in memory, should work aslong as the server doenst restart
let weightedRandomConfig = {
  choices: ["heads", "tails"],
  weights: [0.5, 0.5],
};

io.on("connection", async (socket) => {
  console.log("Connected:", socket.handshake.address);
  console.log("Sending weightedRandomConfig to client:", weightedRandomConfig);

  // Send the stored weightedRandomConfig to the newly connected user
  socket.emit("weightedRandomConfig", encodeData(weightedRandomConfig));

  socket.on("verifyPassword", (password, callback) => {
    callback(password === process.env.ADMIN_PASSWORD);
  });

  socket.on("updateConfig", (config) => {
    console.log("Received updated config:", config);

    // Update the stored weightedRandomConfig with the new config
    weightedRandomConfig = config;

    // Broadcast the updated config to all connected clients
    io.emit("weightedRandomConfig", encodeData(weightedRandomConfig));
  });

  socket.on("disconnect", (_reason) => {
    console.log("Disconnected:", socket.handshake.address);
  });
});

ViteExpress.bind(app, server);
