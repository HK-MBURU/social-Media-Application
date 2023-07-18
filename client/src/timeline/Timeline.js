import React, { useState } from "react";
import "./Timeline.css";
import Suggestion from "./Suggestion";
import Post from "./posts/Post";
import hk1 from "./images/1.jpg";
import hk2 from "./images/2.jpg";
import hk3 from "./images/3.jpg";
import hk4 from "./images/4.jpg";
import { v4 as uuidv4 } from 'uuid';
import Comments from "./posts/comments/Comments";
import Header from "../header/Header";

function Timeline() {
  const [posts, setPosts] = useState([
    {
      user: "hk mburu",
      postImage:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/trec-736885__480.jpg",
      likes: 12,
      timestamp: "2d",
    },
    {
      user: "isa investor",
      postImage: hk2,
      likes: 172,
      timestamp: "9d",
    },
    {
      user: "Dk kiarii",
      postImage: hk3,
      likes: 142,
      timestamp: "28 d",
    },
    {
      user: "Gidis Gideon",
      postImage: hk4,
      likes: 132,
      timestamp: "8d",
    },
    {
      user: "hk mburu",
      postImage:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/trec-736885__480.jpg",
      likes: 12,
      timestamp: "2d",
    },
    {
      user: "Emma Johnson",
      postImage:
        "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg",
      likes: 34,
      timestamp: "6h",
    },
    {
      user: "John Smith",
      postImage:
        "https://cdn.pixabay.com/photo/2016/11/29/04/19/beach-1867285__480.jpg",
      likes: 19,
      timestamp: "1d",
    },
    {
      user: "Sara Thompson",
      postImage:
        "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-649665__480.jpg",
      likes: 56,
      timestamp: "1w",
    },
    {
      user: "Mike Roberts",
      postImage:
        "https://cdn.pixabay.com/photo/2017/05/08/13/15/spring-bird-2295436__480.jpg",
      likes: 8,
      timestamp: "12h",
    },
   
  ]);
  return (
    <div className="timeline">
      <div className="head"> <Header/> </div>
      
      <div className="timeline__left">
        <div className="timeline__posts">
          {posts.map((post) => {
            return (
              <Post
              key={uuidv4()}
                user={post.user}
                postImage={post.postImage}
                likes={post.likes}
                timestamp={post.timestamp}
              />
            );
          })}
        </div>
        
      </div>
      <div className="timeline__right">
      
        <Suggestion />
      </div>
    </div>
  );
}

export default Timeline;
