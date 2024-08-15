const express = require("express");
const { WebSocketServer } = require("ws");
const app = express();
const port = process.env.PORT || 10000;
var ip = process.env.IP || '0,0,0,0';




app.use("/", function(req, res){
    res.sendfile(__dirname + '/index.html');
});

app.listen(port, ip => {
    console.log(port);
});


const wss = new WebSocketServer({ port:8001 });

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