import React from "react";
import "./Sidenav.css";
import logo from "../images/hk.jpg";
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Sidenav() {
  return (
    <div className="sidenav">
      <img className="sidenav__logo" src={logo} alt="" />
      <div className="sidenav__buttons">
      <button className="sidenav__button">
        <MenuIcon />
        <span>Menu</span>
      </button>
      <button className="sidenav__button">
        <HomeIcon />
        <span>Home</span>
      </button>
      <button className="sidenav__button">
        <SearchIcon />
        <span>Search</span>
      </button>
      <button className="sidenav__button">
        <ChatIcon />
        <span>Chat</span>
      </button>
      <button className="sidenav__button">
        <PeopleIcon />
        <span>People</span>
      </button>
      <button className="sidenav__button">
        <SettingsIcon />
        <span>Setting</span>
      </button>
      <button className="sidenav__button">
        <NotificationsIcon />
        <span>Notifications</span>
      </button>
      <button className="sidenav__button">
        <PostAddIcon />
        <span>Post</span>
      </button>
      <button className="sidenav__button">
        <AccountBoxIcon />
        <span>Profile</span>
      </button>
      <button className="sidenav__button">
        <LogoutIcon />
        <span>Logout</span>
      </button>
      

      </div>
      <div className="sidenav__more">
      <button className="sidenav__button">
        <ExpandMoreIcon />
        <span>More</span>
      </button>
      </div>
      
    </div>
  );
}

export default Sidenav;
