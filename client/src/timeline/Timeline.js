import React, { useEffect, useState } from "react";
import "./Timeline.css";
import Suggestion from "./Suggestion";
import Post from "./posts/Post";
import hk1 from "./images/1.jpg";
import hk2 from "./images/2.jpg";
import hk3 from "./images/3.jpg";
import hk4 from "./images/4.jpg";
import { v4 as uuidv4 } from "uuid";
import Comments from "./posts/comments/Comments";
import Header from "../header/Header";
import Search from "../search/Search";
import axios from "axios";
import Follower from "../followers/Follower";
// import { post } from "../../../server/auth/src/routes/signupRoute";

function Timeline() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post("http://localhost:5050/getPosts");
        console.log(response.data);
        setPosts(response.data.results);
      } catch (error) {
        console.error("error fetching posts :", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="timeline">
      <div className="headers">
        <div></div>
      </div>

      <div className="timeline__left">
        <div className="search">
          <Search />
        </div>
        <div className="timeline__posts">
          {posts.map((post) => {
            return (
              <Post
                key={uuidv4()}
                user={post.userName}
                postImage={post.image_url}
                likes={post.likes}
                timestamp={post.created_at}
                content={post.content}
                profilePic={post.userImageUrl}
              />
            );
          })}
        </div>
      </div>
      <div className="timeline__right">
        <div className="suggestion-area">
          <Suggestion />
        </div>
        {/* <div className="follower-area">
          <h5>Your followers</h5>
          <Follower />
          <Follower />
          <Follower />
          <Follower />
        </div> */}
      </div>
    </div>
  );
}

export default Timeline;
