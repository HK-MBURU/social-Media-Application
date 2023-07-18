import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import "./profile.css";
import user from './user.jpg'
import RSidenav from "../navigation/reusableNav/RSidenav";

function Profile() {
  const [userName, setUserName] = useState("");
  const [fullNames, setFullNames] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [bio, setBio] = useState("");

  function submitHandler(event){
    event.preventDefault()

  }
  return (
    <div className="profile">
        <div className="header">
            <RSidenav/>
        </div>
        
      <div className="body">
        <Row className="profile-container">
           <Col md={6}>
          <Form>
            <Form.Group controlId="userName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="fullNames">
              <Form.Label>Full Names </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your FullNames"
                value={fullNames}
                onChange={(e) => setFullNames(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="pic">
              <Form.Label>Change profile Picture</Form.Label>
              <Form.Control
                // onChange={(e)=>postDetails(e.target.files[0])}
                id="custom-file"
                type="file"
                label="upload Profile Picture"
                custom
              ></Form.Control>
            </Form.Group>
            <Button /*type="submit"*/ varient="success" onSubmit={submitHandler} className="submit-btn">
              Update
            </Button>
          </Form>
        </Col>
        <Col className="profile-pic-col">           
          <img src={user} alt={userName} className="profilePic" />
        </Col>  
        </Row>
       
      </div>
    </div>
  );
}

export default Profile;
