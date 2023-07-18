import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Button, Form } from "react-bootstrap";
import Homepage from './Homepage'
import './App.css'
import Profile from './user/Profile'
import Settings from './settings/Settings'
import Notifications from './notifications/Notifications'
import Followers from './followers/Followers'



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/homepage' element={<Homepage/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/settings' element={<Settings/>}></Route>
      <Route path='/notifications' element={<Notifications/>}></Route>
      <Route path='/followers' element={<Followers/>}></Route>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App