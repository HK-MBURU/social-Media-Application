import React from 'react'
import './confirmProfieUpdate.css'
import { Link } from 'react-router-dom'

function ConfirmProfileUpdate() {
  return (
    <div className='confirmProfileUpdate'>

        <div className="title">
            <h3>Update Your Profile</h3>
        </div>
        <div className="recomendation">
            <p>Thank you for joining this fantastic social media application . 
                Its amazing to see you here now. Before going to homepage would
                you like to add some of your profile information so that your friends will know 
                you better and have some cool interaction.
            </p>
            <p>You will be required to upload your profile image, update your bio, location and any 
                other information that you would like your friends to know about you.
            </p>
        </div>
        <div className="navBtns">
            <Link to='/homepage'><button className='btn'>Skip</button> </Link>
            <Link to='/updateProfile'> <button className='btn'>Update Profile</button></Link>
            
            
        </div>
    </div>
  )
}

export default ConfirmProfileUpdate