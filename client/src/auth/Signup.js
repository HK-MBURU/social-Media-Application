import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullNames: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const[successMessage,setSuccessMessage]=useState("")
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpUser();
      localStorage.setItem("isSignedUp",true)
      setSuccessMessage("Sign up succesful proceed to login")
      navigate("/confirmProfileUpdate");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("an error occurred during signup . please try again ");
      }
      console.log("error occured during signup:", error);
    }
  };
  async function signUpUser() {
    try {
      const response = await axios.post(
        "http://localhost:4040/signup",
        formData
      );
      console.log(response.data);
    } catch (error) {
      throw error;
      
    }
  }

  const isButtonDisabled =
    Object.values(formData).some((value) => value === "") //|| error;
    const inputError=error
    let text=""
    if(isButtonDisabled){
        text="Please fill all fields to signup"        
    }else if(error){
        text=error//"Error in your inputs ensure your have a unique username, email and phone number"
    }else{
        text=successMessage
    }


  return (
    <div className="signup template d-flex justify-content-center align-items-center  vh-100 bg-secondary">
      <div className="form_container p-2 rounded bg-dark ">
        {/* {error && <div className="alert alert-danger text-small">{error}</div>} */}
        <form action="" onSubmit={handleSubmit}>
          <h3 className="text-center">Sign Up Page</h3>

          <div className="mb-2">
            <label htmlFor="names">Full Names </label>
            <input
              type="text"
              placeholder="Enter Your full names"
              className="form-control"
              name="fullNames"
              value={formData.fullNames}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="userName">Username </label>
            <input
              type="text"
              placeholder="Enter Your unique username"
              className="form-control"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email </label>
            <input
              type="email"
              placeholder="Enter Email address"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phoneNumber">Your Phone Number </label>
            <input
              type="text"
              placeholder="Enter Yor Phone Number"
              className="form-control"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="confirmPassword">Confirm Password </label>
            <input
              type="password"
              placeholder="Confirm Password you entered"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid mt-2">
            <div className="d-grid mt-2"
            title={isButtonDisabled ?"Fill all details before signing up" :""}>
                
              <button
                className="btn btn-success"
                type="submit"
                disabled={isButtonDisabled}
                title={
                  isButtonDisabled
                    ? "Please fill all details before signing up"
                    : ""
                }
              >
                Sign Up
              </button>
              <p className="text-danger small">
              {text }
                </p>
              
            </div>
          </div>
          <p className="text-end mt-2">
            Already have an account{" "}
            <Link to="/" className="ms-2">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
