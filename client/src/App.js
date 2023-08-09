import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { Row, Col, Button, Form } from "react-bootstrap";
import Homepage from './Homepage'
import './App.css'
import Profile from './user/Profile'
import Settings from './settings/Settings'
import Notifications from './notifications/Notifications'
import Followers from './followers/Followers'
import UpdateProfile from './user/UpdateProfile'
import ConfirmProfileUpdate from './user/ConfirmProfileUpdate'
import axios from 'axios'
import CreatePost from './timeline/posts/CreatePost'
import UserProfile from './user/userProfile/UserProfile'
import ProgressBar from './auth/progressBar/ProgressBar'
import ProgressBarExample from './auth/progressBar/ProgressBarExample'



function App() {
  axios.defaults.baseURL='http://localhost:5050'
  axios.defaults.withCredentials=true
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
      <Route path='/updateProfile' element={<UpdateProfile/>}></Route>
      <Route path='/confirmProfileUpdate' element={<ConfirmProfileUpdate/>}></Route>
      <Route path='/createPost' element={<CreatePost/>}></Route>
      <Route path='/userProfile/:userName' element={<UserProfile/>}></Route>
      <Route path='/progressBar' element={<ProgressBarExample/>}></Route>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App