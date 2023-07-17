import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
import Homepage from './Homepage'
import './App.css'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/homepage' element={<Homepage/>}></Route>
      <Route path='/homepage' element={<Homepage/>}></Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App