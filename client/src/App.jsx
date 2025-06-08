import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/profilePage'
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'

const App = () => {
  const {authUser} = useContext(AuthContext)
  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      {/*route to different pages*/}
      <Toaster />
      <Routes>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path= '/' element={authUser ? <Homepage/> : <Navigate to="/login"/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App
