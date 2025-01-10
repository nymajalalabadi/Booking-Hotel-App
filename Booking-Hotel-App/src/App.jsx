import { Toaster } from 'react-hot-toast'
import Header from './components/header/Header'
import './App.css'
import LocationList from './components/LocationList/LocationList'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/appLayout/AppLayout'
import Hotels from './components/Hotels/Hotels'
import HotelsProvider from './components/Context/HotelsProvider'
import SingleHotel from './components/SingleHotel/SingleHotel'

function App() {
  return (
    <HotelsProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />} >
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel/>} />
          </Route>
        </Routes>
    </HotelsProvider>
  )
}

export default App
