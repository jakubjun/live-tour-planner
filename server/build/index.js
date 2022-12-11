"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const types_1 = require("./types");
console.log('starting');
const wss = new ws_1.WebSocketServer({
    port: 8080,
    clientTracking: true,
});
function getRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}
wss.on('connection', (connectedWs) => {
    connectedWs.color = getRandomColor();
    console.log('setcolor');
    connectedWs.send(JSON.stringify({ type: 'setColor', payload: connectedWs.color }));
    connectedWs.on('message', (data) => {
        const { payload, type } = JSON.parse(data.toString());
        if (type === types_1.PayloadTypes.SET_CURSORS) {
            wss.clients.forEach((ws) => {
                if (connectedWs.color === ws.color) {
                    return;
                }
                ws.send(JSON.stringify({
                    type: types_1.PayloadTypes.SET_CURSORS,
                    payload: { color: connectedWs.color, latlng: payload },
                }));
            });
        }
    });
});
