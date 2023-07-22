import { DarkMode, Delete, Logout, Password } from "@mui/icons-material";
import React from "react";
import "./settingsNav.css";
import { useNavigate } from "react-router-dom";
import handleLogOut from "../logout/Logout";
// import { setDarkMode, setLightMode } from "./mode";
import { ToggleButton } from "react-bootstrap";

function SettingsNav() {
//   setLightMode();
const setDarkMode=()=>{
    document.querySelector("body").setAttribute('data-theme','dark')
    localStorage.setItem("selectedTheme","dark")
}
const setLightMode=()=>{
    document.querySelector("body").setAttribute('data-theme','light')
    localStorage.setItem("selectedTheme","light")
}
const selectedTheme=localStorage.getItem("selectedTheme")

if(selectedTheme==="dark"){
    setDarkMode()
}

  let navigate = useNavigate();
  function logout() {
    handleLogOut();
    navigate("/");
  }
  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };
  return (
    <div className="container">
      {/* <ToggleButton/> */}
      <div className="icons">
        <div onClick={logout} className="icon-btn">
          <Logout className="icon" />
          <span>Logout</span>
        </div>
        <div className="icon-btn">
          <Password className="icon" />
          <span>Change Password</span>
        </div>
        <div className="icon-btn" >
            <input type="checkbox" id="darkmode-toggle" onChange={toggleTheme} className="dark_mode_input"
            defaultChecked={selectedTheme==="dark"} />
          {/* <DarkMode className="icon" /> */}

          <span>Change mode </span>
        </div>
        <div className="icon-btn">
          <Delete className="icon" />
          <span>Delete Account</span>
        </div>
      </div>
    </div>
  );
}

export default SettingsNav;
