import {useMapEvents} from 'react-leaflet'
import {useDispatch} from 'react-redux'
import {setMyCursor} from '../store'

const MOUSE_MOVE_TIMEOUT = 10

export default function MouseObserver() {

  const dispatch = useDispatch()
  let timeout:number

  useMapEvents({
    mousemove(e) {
      clearTimeout(timeout)
      dispatch(setMyCursor(e.latlng))

      // timeout = setTimeout(() => {
      //   dispatch(setMyCursor(e.latlng))

      // }, MOUSE_MOVE_TIMEOUT)
    }
  })

  return null
}
