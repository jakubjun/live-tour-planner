import {Middleware} from '@reduxjs/toolkit'
import {connect, setColor, setCursors, setMyCursor} from './store'
import {PayloadTypes} from '../../server/src/types'

const socketMiddleware:Middleware = store => {
  let websocket: WebSocket

  return next => action => {
    if (action.type === connect.type) {

      if (websocket) {
        websocket.close()
      }

      websocket = new WebSocket('ws://localhost:8080')


      websocket.addEventListener('message', (event) => {

        const {type, payload} = JSON.parse(event.data)

        if (type === PayloadTypes.SET_COLOR) {
          store.dispatch(setColor(payload))
        }

        if (type === PayloadTypes.SET_CURSORS) {
          store.dispatch(setCursors(payload))
        }

      })

    }

    if (!websocket) {
      return
    }

    if (action.type === setMyCursor.type) {
      websocket.send(JSON.stringify({type: PayloadTypes.SET_CURSORS, payload: action.payload}))
    }

    return next(action)
  }
}

export default socketMiddleware
