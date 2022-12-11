import ws, {WebSocketServer} from 'ws'
import {PayloadTypes} from './types'

// https://github.com/websockets/ws/issues/1517#issuecomment-650756592
declare module 'ws' {
    export interface WebSocket extends ws {
        color?: string
    }
}

console.log('starting')
const wss = new WebSocketServer({
    port: 8080,
    clientTracking: true,
})

function getRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16)
}


wss.on('connection', (connectedWs) => {
    connectedWs.color = getRandomColor()
    console.log('setcolor')
    connectedWs.send(JSON.stringify({ type: PayloadTypes.SET_COLOR, payload: connectedWs.color }))

    connectedWs.on('message', (data) => {
        const { payload, type } = JSON.parse(data.toString())

        if (type === PayloadTypes.SET_CURSORS) {
            wss.clients.forEach((ws) => {

                if (connectedWs.color === ws.color) {
                    return
                }

                ws.send(
                    JSON.stringify({
                        type: PayloadTypes.SET_CURSORS,
                        payload: { color: connectedWs.color, latlng: payload },
                    })
                )
            })
        }
    })
})
