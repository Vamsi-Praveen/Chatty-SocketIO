import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Register from './pages/Register'
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Chat />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </BrowserRouter>
      <Toaster position='top-center' />
    </>
  )
}

export default App