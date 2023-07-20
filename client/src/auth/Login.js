import React, { useState } from 'react'
import './style.css'
import { Link,useNavigate } from 'react-router-dom'
import axios  from 'axios'

function Login() {
    const navigate=useNavigate()

    const[formData,setFormData]=useState({
        phoneNumber:"",
        password:"",
    })
    const[error,setError]=useState(null)
    const[succMessage,setSuccessMessage]=useState("")

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            await loginUser()

            
            setSuccessMessage("Login succesful.Soon you will be directed to homepage")
            navigate("/homepage")
            
        } catch (error) {
            if (error.response&& error.response.data&& error.response.message) {
                setError(error.response.data.message)
                
            } else {
                setError("Error occureed during login check your inputs")
                
            }
            console.log("error occurred during login :",error);
            
        }
    }
    async function loginUser(){
        try {
            const response=await axios.post("http://localhost:4040/login",formData)
            console.log(response.data);
        } catch (error) {
            throw error
            
        }
    }

    const isButtonDisabled=Object.values(formData).some((value)=>value==="")
    const inputError=error
    let text=""
    if(isButtonDisabled){
        text="Please fill all fields to login"
    }
    else if(error){
        text=error
    }
    else{
        text=succMessage
    }

  return (
    <div className='login template d-flex justify-content-center align-items-center  vh-100 bg-secondary'>
        <div className='form_container p-5 rounded bg-dark'>
            <form action="" onSubmit={handleSubmit}>
            <h3 className='text-center'>Login Page</h3>
            
            <div className='mb-2'>
                <label htmlFor="email">Phone Number </label>
                <input type="text"
                 placeholder='Enter Your phone Number'
                  className='form-control' 
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  />
            </div>
            <div className='mb-2'>
                <label htmlFor="password">Password </label>
                <input 
                type="password"
                 placeholder='Enter Your Password'
                  className='form-control'
                  name='password'
                  value={formData.password}
                  onChange={handleChange} />
            </div>
            <div className='mb-2'>
                <input type="checkbox" className='custom-control custom-checkbox' id="check" />
                <p className='text-danger small'>{text}</p>
                <label htmlFor="check" className='custom-input-label ms-2'>Remember me</label>
            </div>
            <div className="d-grid">
                <button className='btn btn-success'
                type='submit'
                disabled={isButtonDisabled}>Login</button> 
                

            </div>
            <p className='text-end mt-2'>
                Forgot <Link href="">Password </Link> Dont have an account {" "}<Link to="/signup" className="ms-2">{" "} Register</Link>
            </p>
        </form>
        </div>
        
        
        </div>
  )
}

export default Login