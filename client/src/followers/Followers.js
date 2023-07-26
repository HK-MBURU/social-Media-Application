import React from "react";
import "./followers.css";
import { Avatar } from "@mui/material";
import Follower from "./Follower";
import RSidenav from "../navigation/reusableNav/RSidenav";
import { Search } from "@mui/icons-material";
function Followers() {
  return (
    <div className="followers">
      <div className="header">
        <RSidenav />
      </div>
      <div className="follower_title">
        <h5>Users You follow</h5>
        <div className="fixed-text">
          <input type="text" placeholder="Search a follower" />
          <Search className="searchIcon" />
        </div>
      </div>
      <div className="followersContent">
        <Follower />
        <Follower />
        <Follower />
        <Follower />
        <Follower />
        <Follower />
        <Follower />
      </div>
    </div>
  );
}

export default Followers;
