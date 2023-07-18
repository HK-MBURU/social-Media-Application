import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// import store from "./store";

function Profile() {
  const [userName, setUserName] = useState("");
  const [fullNames, setFullNames] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [bio, setBio] = useState("");

  // const dispatch = useDispatch();
  // const {userInfo}=userLogin

  // const userUpdate=useSelector((state)=>state.userUpdate)
  // const {loading,error,succes}=userUpdate
  return (
    <div className="profile">
      <div>
        <Row className="profileContainer">
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
                <Form.File
                  // onChange={(e)=>postDetails(e.target.files[0])}
                  id="custom-file"
                  type="image/jpg"
                  label="upload Profile Picture"
                  custom
                ></Form.File>
              </Form.Group>
              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col className="profile-pic-col">
            <img src={pic} alt={userName} className="profilePic" />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Profile;
