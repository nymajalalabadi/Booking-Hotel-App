import { Toaster } from 'react-hot-toast'
import Header from './components/header/Header'
import './App.css'
import LocationList from './components/LocationList/LocationList'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/appLayout/AppLayout'
import Hotels from './components/Hotels/Hotels'
import HotelsProvider from './components/Context/HotelsProvider'
import SingleHotel from './components/SingleHotel/SingleHotel'
import BookmarkLayout from './components/BookmarkLayout/BookmarkLayout'
import BookMarkListProvider from './components/Context/BookMarkListProvider'

function App() {
  return (
    <BookMarkListProvider>
      <HotelsProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />} >
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel/>} />
          </Route>
          <Route path="/bookmark" element={<BookmarkLayout/>} >
            <Route index element={<div>book mark list</div>} />
            <Route path="add" element={<div>add new book mark </div>} />
          </Route>
        </Routes>
    </HotelsProvider>
    </BookMarkListProvider>
  )
}

export default App
