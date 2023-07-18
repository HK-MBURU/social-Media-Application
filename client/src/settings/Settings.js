import React from 'react'
import './settings.css'
import RSidenav from '../navigation/reusableNav/RSidenav'
import { Logout } from '@mui/icons-material'
import SettingsNav from './SettingsNav'
import SettingsDetails from './SettingsDetails'

function Settings() {
  return (
    <div className='settings'>
        <div className="header">
            <RSidenav/>

        </div>
        
        <div className="settings-body">
            <div className="settingsNav">
                <SettingsNav/>
            </div>
            <div className="settingsDetails">
                <SettingsDetails/>

            </div>

        </div>

    </div>
  )
}

export default Settings