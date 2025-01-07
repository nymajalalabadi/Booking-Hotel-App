import { Toaster } from 'react-hot-toast'
import Header from './components/header/Header'
import './App.css'
import LocationList from './components/LocationList/LocationList'

function App() {

  return (
    <div>
      <div>
        <Toaster />
        <Header />
        <LocationList/>
      </div>
    </div>
  )
}

export default App
