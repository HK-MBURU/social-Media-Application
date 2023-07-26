import React, { useEffect, useState } from "react";
import "./Suggestion.css";
import { Avatar } from "@mui/material";
import axios from "axios";


function Suggestion() {
  const [usersToFollow, setUsersToFollow] = useState([]);

  useEffect(() => {
    // Fetch data from the endpoint using Axios
    axios
      .get("http://localhost:5050/getAll")
      .then((response) => {
        setUsersToFollow(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching users to follow:", error);
      });
  }, []);

  return (
    <div className="suggestions">
      <div className="suggestions__title">Users to follow</div>
      <div className="sugesstions__usernames">
        {usersToFollow.map((user, index) => (
          <div key={index} className="suggestion__username">
            <div className="username__left">
              <span className="avatar">
                <Avatar>{/*<img src={user.imgUrl}/> ||*/user.userName.charAt(0).toUpperCase()}</Avatar>
              </span>
              <div className="username__info">
                <span className="username">{user.userName}</span>
                <span className="relation">{user.fullNames}</span>
              </div>
            </div>
            <button className="follow_button">Follow</button>
          </div>
        ))}
      </div>
    </div>

    // <div className="suggestions">
    //   <div className="suggestions__title">Users to follow</div>
    //   <div className="sugesstions__usernames">
    //     <div className="suggestion__username">
    //       <div className="username__left">
    //         <span className="avatar">
    //           <Avatar>HK</Avatar>
    //         </span>
    //         <div className="username__info">
    //           <span className="username">HK MBURU</span>
    //           <span className="relation">The creator of this app</span>
    //         </div>
    //       </div>
    //       <button className="follow_button">Follow</button>
    //     </div>
    //   </div>

    //   <div className="sugesstions__usernames">
    //     <div className="suggestion__username">
    //       <div className="username__left">
    //         <span className="avatar">
    //           <Avatar>HK</Avatar>
    //         </span>
    //         <div className="username__info">
    //           <span className="username">HK MBURU</span>
    //           <span className="relation">The creator of this app</span>
    //         </div>
    //       </div>
    //       <button className="follow_button">Follow</button>
    //     </div>
    //   </div>

    // </div>
  );
}

export default Suggestion;
