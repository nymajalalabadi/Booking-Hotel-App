import { Toaster } from 'react-hot-toast'
import Header from './components/header/Header'
import './App.css'
import LocationList from './components/LocationList/LocationList'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/appLayout/AppLayout'
import Hotels from './components/Hotels/Hotels'

function App() {
  return (
    <div>
      <div>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />} >
            <Route index element={<Hotels />} />
            <Route path=":id" element={<div>single hotel</div>} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
