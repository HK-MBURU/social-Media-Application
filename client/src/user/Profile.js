import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import "./profile.css";
import user from "./user.jpg";
import RSidenav from "../navigation/reusableNav/RSidenav";
import axios from "axios";


function Profile() {
  const [userName, setUserName] = useState("");
  const [fullNames, setFullNames] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [bio, setBio] = useState("");
  const [showUpdateBtn, setShowUpdateButton] = useState(false);
  const [showUpEditBtn, setShowEditButton] = useState(true);
  const[isEditable,setIsEditable]=useState(true)

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData=async()=>{
    try {
      const response= await axios.get("http://localhost:5050/profile")
      console.log(response.data);

      setUserName(response.data.results[0].userName);
      setEmail(response.data.results[0].email)
      setFullNames(response.data.results[0].fullNames)
      setBio(response.data.results[0].bio)
      setPic(response.data.results[0].imgUrl)

    } catch (error) {
      console.error("Error fetching data:", error);
      
    }
  }

  const showUpdate = () => {
    setIsEditable(false)
    setShowUpdateButton(true);
    setShowEditButton(false);
    submitHandler()
    console.log(bio);
  };
  const showEdit = () => {
    setIsEditable(true)
    setShowUpdateButton(false);
    setShowEditButton(true);
    console.log(bio);
  };

  function submitHandler(event) {
    // event.preventDefault();

  }
  return (
    <div className="profile">
      <div className="header">
        <RSidenav />
      </div>

      <div className="body">
        <Row className="profile-container">
          <Col md={6}>
            <Form>
              <Form.Group controlId="userName">
                <Form.Label><u> <em>Username </em></u></Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Enter your Username"
                  value={userName}
                 readOnly
                ></Form.Control> */}
                <Form.Control plaintext readOnly value={userName} className="text-white font-weight-bolder"/>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label><u> <em>Email Address </em></u>  </Form.Label>
                <Form.Control plaintext readOnly value={email} className="text-white font-weight-bolder"/>
                {/* <Form.Control
                  type="text"
                  placeholder="Enter your Email Address"
                  value={email}
                  readOnly
                ></Form.Control> */}
              </Form.Group>
              <Form.Group controlId="fullNames">
                <Form.Label><u> <em>Your full names </em></u> </Form.Label>
                {!isEditable ? (<Form.Control
                  type="text"
                  placeholder="Enter your FullNames"
                  value={fullNames}
                  onChange={(e) => setFullNames(e.target.value)}
                  
                ></Form.Control>):(<Form.Control plaintext readOnly value={fullNames} className="text-white font-weight-bolder"/>)}
              </Form.Group>
              <Form.Group controlId="bio">
                <Form.Label> <u> <em>Bio </em></u></Form.Label>
                {!isEditable ?(<Form.Control
                  as="textarea"
                  placeholder="Enter your Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></Form.Control>):(<Form.Control plaintext readOnly value={bio} className="text-white font-weight-bolder"/>)}
              </Form.Group>
              <Form.Group controlId="pic">
                {!isEditable &&<Form.Label> <u> <em>Change Profile picture </em></u></Form.Label>}
                {!isEditable && <Form.Control
                  id="custom-file"
                  type="file"
                  label="upload Profile Picture"
                  custom
                ></Form.Control>}
              </Form.Group>
              {showUpdateBtn && (
                <Button
                  varient="success"
                  onClick={showEdit}
                  /*onSubmit={submitHandler}*/ className="submit-btn"
                >
                  Update
                </Button>
              )}
              {showUpEditBtn && (
                <Button
                  varient="primary"
                  onClick={showUpdate}
                  className="submit-btn"
                >
                  Edit
                </Button>
              )}
            </Form>
          </Col>
          <Col className="profile-pic-col">
            <img src={pic} alt={userName} className="profilePic rounded img-fluid" />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Profile;
