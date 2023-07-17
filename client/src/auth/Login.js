import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='login template d-flex justify-content-center align-items-center  vh-100 bg-primary'>
        <div className='form_container p-5 rounded bg-white'>
            <form action="">
            <h3 className='text-center'>Login Page</h3>
            
            <div className='mb-2'>
                <label htmlFor="email">Email </label>
                <input type="email" placeholder='Enter Email address' className='form-control' />
            </div>
            <div className='mb-2'>
                <label htmlFor="password">Password </label>
                <input type="password" placeholder='Enter Your Password' className='form-control' />
            </div>
            <div className='mb-2'>
                <input type="checkbox" className='custom-control custom-checkbox' id="check" />
                <label htmlFor="check" className='custom-input-label ms-2'>Remember me</label>
            </div>
            <div className="d-grid">
                <Link  to="/homepage"><button className='btn btn-primary'>Login</button> </Link>
                

            </div>
            <p className='text-end mt-2'>
                Forgot <a href="">Password </a> Dont have an account <Link to="/signup" className="ms-2"> Register</Link>
            </p>
        </form>
        </div>
        
        
        </div>
  )
}

export default Login