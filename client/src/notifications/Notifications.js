import React from "react";
import "./notifications.css";
import RSidenav from "../navigation/reusableNav/RSidenav";
import Notification from "./Notification";

function Notifications() {
  return (
    <div className="notifications">
      <div className="container">
        <div className="header">
          <RSidenav />
        </div>
        <div className="notificationContent">
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            

          
          </div>
        </div>
      </div>
  );
}

export default Notifications;
