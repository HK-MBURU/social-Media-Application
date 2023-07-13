import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='signup template d-flex justify-content-center align-items-center  vh-100 bg-primary'>
        <div className='form_container p-5 rounded bg-white '>
            <form action="">
            <h3 className='text-center'>Sign Up Page</h3>
            
            <div className='mb-2'>
                <label htmlFor="names">Full Names </label>
                <input type="text" placeholder='Enter Your full names' className='form-control' />
            </div>
            <div className='mb-2'>
                <label htmlFor="names">Username </label>
                <input type="text" placeholder='Enter Your unique username' className='form-control' />
            </div>
            <div className='mb-2'>
                <label htmlFor="email">Email </label>
                <input type="email" placeholder='Enter Email address' className='form-control' />
            </div>
            <div className='mb-2'>
                <label htmlFor="password">Your Bio </label>
                <textarea placeholder='Tell us bout yourself' className='form-control' />
            </div>
            <div className='mb-2'>
                <label htmlFor="password">Password </label>
                <input type="password" placeholder='Enter Your Password' className='form-control' />
            </div>
            <div className='mb-2'>
                <label htmlFor="password">Confirm Password </label>
                <input type="password" placeholder='Confirm Password you entered' className='form-control' />
            </div>
          
            <div className="d-grid mt-2">
                <button className='btn btn-primary'>Sign Up</button>

            </div>
            <p className='text-end mt-2'>
                 Already have an account <Link to="/" className="ms-2"> Login</Link>
            </p>
        </form>
        </div>
        
        
        </div>
  )
}

export default Signup