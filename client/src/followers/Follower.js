import React from "react";
import "./follower.css";
import { Avatar } from "@mui/material";
function Follower() {
  return (
    <div className="follower">
      <div className="followers__usernames">
        <div className="follower__username">
          <div className="username__left">
            <span className="avatar">
              <Avatar>HK</Avatar>
            </span>
            <div className="username__info">
              <span className="username">HK MBURU</span>
              <span className="relation">The creator of this app</span>
            </div>
          </div>
          <button className="chat_button">Chat</button>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Follower;
