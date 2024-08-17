const express = require("express");
const { WebSocketServer } = require("ws");
const app = express();

const PORT = process.env.PORT || 8000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, {root: __dirname}))
    .listen(PORT, () => console.log(`listening on ${PORT}`));


const wss = new WebSocketServer({ server });

wss.on("connection", (ws,request) => {
    wss.clients.forEach(client => {
        client.send('new user'+wss.clients.size);
    })

    console.log('new user'+request.socket.remoteAddress);

    ws.on("close", () => {
        wss.clients.forEach((client) => {
            client.send('user out'+wss.clients.size);
        })
    })

    ws.on("message", data => {
        wss.clients.forEach(client => {
            client.send(data.toString());
        })
    })
})