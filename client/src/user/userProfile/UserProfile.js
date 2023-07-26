import { Favorite, Comment } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import RSidenav from "../../navigation/reusableNav/RSidenav";
import './userprofile.css'


function UserProfile() {
  const { userName } = useParams();

  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [fullNames, setFullNames] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    // let userName = "@jeremy";

    try {
      const response = await axios.get(
        `http://localhost:5050/getUser/${userName}`
      );

      setUserName(response.data.UserName);
      setEmail(response.data.Email);
      setFullNames(response.data.FullNames);
      setBio(response.data.Bio);
      setProfilePic(response.data.ProfilePic);
      setPosts(JSON.parse(response.data.Posts));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="bigContainer">
      <RSidenav/>
      <Container className="bg-dark text-light w-100">
      
      <Row className="mt-2">
        <Col md={4} className="text-center">
          <Image
            src={profilePic}
            /*roundedCircle fluid*/ style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
            }}
          />
          <h3 className="mt-2"> {fullNames}</h3>
        </Col>
        <Col md={8}>
          <h4>Username: {UserName}</h4>
          <p>Email: {email}</p>
          <h5>Bio :</h5>
          <p>{bio}</p>
        </Col>
      </Row>

      <Row className="mt-0 no-gutters">
        <Col md={7}>
          <h4>Posts</h4>
          <div className="d-flex flex-wrap  "style={{ margin:"auto",flexWrap:"wrap",justifyContent:"space-evenly",width:"100%", }}>
            {posts.map((post) => (
              <Card key={post.post_id} className="mb-3 w-50 d-flex  ">
                <Card.Body className="bg-light d-flex flex-column ">
                  <Card.Title as="h6" style={{ fontSize: "12px" }}>{post.content}</Card.Title>
                  <Card.Img src={post.image_url} />
                  <div className="d-flex justify-content-between mt-2">
                    <div>                      
                      <Favorite style={{ color: "black" }} />
                      {post.likes}
                    </div>
                    <div>
                      <Comment style={{ color: "black" }} />
                      {post.comments}
                    </div>
                  </div>
                  
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>

    </div>
    
  );
}

export default UserProfile;
