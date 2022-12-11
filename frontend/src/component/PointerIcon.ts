import L from 'leaflet'
import marker from '../assets/pointer-icon.svg'
const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor:  [-0, -0],
  iconSize: [24,24],     
  color: 'blue',
  
})

export default myIcon
