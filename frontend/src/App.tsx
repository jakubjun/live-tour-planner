import './App.css'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import MouseObserver from './component/MouseObserver'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { connect} from './store'
import myIcon from './component/PointerIcon.ts'

function App() {
  const dispatch = useDispatch()
  const color = useSelector(state => state.map.color)
  const cursors = useSelector(state => state.map.cursors)
  useEffect(() => {
    dispatch(connect())
  }, [])

  return (
    <>
      {JSON.stringify(cursors)}
      <span style={{color: `#${color}`}}>barva</span>
      <MapContainer
        style={{height: '100vh', width: '100vw'}}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.entries(cursors).map(([color, latlng]) => 
          <Marker icon={myIcon} style={{color: 'red'}} key={color} position={[latlng.lat, latlng.lng]}>
            <Popup>
              
              <span style={{color: `#${color}`}}>{color}</span>
            </Popup>
          </Marker>
        )}
        <MouseObserver/>
      </MapContainer></>)
}

export default App
