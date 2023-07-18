import { DarkMode, Delete, Logout, Password } from '@mui/icons-material'
import React from 'react'
import './settingsNav.css'

function SettingsNav() {
  return (
    <div className='container'>
        <div className="icons">
            <div >
                <Logout className="icon"/>
                <span>Logout</span>
            </div>
            <div >
                <Password className="icon"/>
                <span>Change Password</span>
            </div>
            <div >
                <DarkMode className="icon"/>
                <span>Change mode Account</span>
            </div>
            <div >
                <Delete className="icon"/>
                <span>Delete Account</span>
            </div>

        </div>

    </div>
  )
}

export default SettingsNav