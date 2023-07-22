import React from "react";
import "./rSidenav.css";
import logo from "../../images/hk.jpg";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatIcon from "@mui/icons-material/Chat";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import handleLogOut from "../../logout/Logout";
import { useNavigate } from 'react-router-dom'


function RSidenav() {
  let navigate=useNavigate()
  function logout(){
      handleLogOut()
      navigate("/")
    }
  return (
    <div className="topnav">
      <img className="sidenav_logo" src={logo} alt="" />
      <div className="sidenav_buttons">
        <Link to="/homepage">
          <button className="sidenav_button">
            <HomeIcon />
            <span>Home</span>
          </button>
        </Link>
        <Link>
        <button className="sidenav_button">
          <SearchIcon />
          <span>Search</span>
        </button>
        </Link>
        <Link>
        <button className="sidenav_button">
          <ChatIcon />
          <span>Chat</span>
        </button>
        </Link>
        <Link to="/followers">
        <button className="sidenav_button">
          <PeopleIcon />
          <span>Followers</span>
        </button>
        </Link>
        <Link to="/settings">
          <button className="sidenav_button">
            <SettingsIcon />
            <span>Setting</span>
          </button>
        </Link>
        <Link to="/notifications">
        <button className="sidenav_button">
          <NotificationsIcon />
          <span className="count">1</span>
          <span>Notifications</span>
        </button>
        </Link>
        <Link>
        <button className="sidenav_button">
          <PostAddIcon />
          <span>Post</span>
        </button>
        </Link>

        <Link to="/profile">
          <button className="sidenav_button">
            <AccountBoxIcon />
            <span>Profile</span>
          </button>
        </Link>
        <Link>
        <button className="sidenav_button" onClick={logout}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
        </Link>
      </div>
      <div className="sidenav_more">
        <button className="sidenav_button">
          <ExpandMoreIcon />
          <span>More</span>
        </button>
      </div>
    </div>
  );
}

export default RSidenav;
