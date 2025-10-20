import { useState } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify'
import Routers from './routers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routers />
      <ToastContainer />
    </>
  )
}

export default App
