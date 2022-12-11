import { configureStore, createSlice} from '@reduxjs/toolkit'
import socketMiddleware from './middleware.js'

// interface MapState {
// }

// const initialState: MapState = {
// mouseLatLng: null,
// points: [],
// }

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    color: null,
    cursors: {}
  },
  reducers: {
    connect: (state) => {
      console.log('connecting')
      return
    },
    setColor: (state, action) => {
      state.color = action.payload
    },
    setMyCursor: (state, action) => {
      return
    },
    setCursors: (state, action) => {
      state.cursors[action.payload.color] = action.payload.latlng
    }
    // addPoint: (state) => {
    //   state.value -= 1
    // },
    // removePoint: (state) => {
    //   state
    // }
  },
})

export default configureStore({
  reducer: {
    map: mapSlice.reducer
  },
  middleware: [socketMiddleware]
    
})

export const {connect, setColor, setCursors, setMyCursor} = mapSlice.actions
