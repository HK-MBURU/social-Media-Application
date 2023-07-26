import React, { useEffect, useState } from "react";
import "./updateProfile.css";
import axios from "axios";
import { Form, Button, Col, Dropdown, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FlagSelect from "react-flags-select";
// import "react-flag-select/css/react-flags-select.css"
import user from "./u.png";
import apiClient from "../apiClient";

function UpdateProfile() {
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  // error 
  const [error, setError] = useState(null);
  const[successMessage,setSuccessMessage]=useState("")
  

  const fileInputRef = React.createRef();

  const preset_key = "amodduyt";
  const cloud_name = "dkpnavrhu";
  const [image, setImage] = useState();

  const  handleFileUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,{withCredentials:false},
      )
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.log(err));
    setProfilePicture(file);
    e.target.value = null;
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        console.log(response.data[5].name.common);

        const sortedCountries = response.data.sort((a, b) => {
          const countryA = a.name.common.toUpperCase();
          const countryB = b.name.common.toUpperCase();
          if (countryA < countryB) {
            return -1;
          }
          if (countryA > countryB) {
            return 1;
          }
          return 0;
        });
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries: ", error);
      }
    };
    fetchCountries();
  }, []);
  let imgUrl=image
  const formData = {
    bio,
    location: selectedCountry,
    imgUrl,
  };
  console.log(formData);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserDetails()
      setSuccessMessage("Your details were updated succesfully")
      
     
      // console.log(selectedCountry);
      setUserName("");
      setBio("");
      setLocation("");
      setSelectedCountry("");
      setProfilePicture(null);

      navigate("/homepage");

      console.log("profile Updated succesfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
 const updateUserDetails=async()=>{
  try {
    const response=await axios.put("http://localhost:5050/updateProfile",formData,{withCredentials:true},)
    console.log(response.data);
  } catch (error) {
    throw(error)
    
  }
 }

  return (
    <Row className="mt-5 wholeForm">
      <Col md={{ span: 6, offset: 3 }}>
        <Form onSubmit={handleSubmit} className="custom-form">
          <div className="pre-form">
            <h3>Update Profile</h3>
            <img
              src={image || user}
              className=" rounded-circle uploadedImage"
              alt="profile image"
            />
          </div>

        

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter you bio here just some information about you"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <FlagSelect
              searchable={true}
              options={countries.map((country) => ({
                value: country.name.common,
                label: country.name.common,
                icon: <img src={country.flags.png} alt={country.name.common} />,
              }))}
              selected={selectedCountry}
              onSelect={(val) => setSelectedCountry(val)}
              placeholder="Select your country"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>

            <Form.Control
              ref={fileInputRef}
              type="file"
              placeholder="Enter your user name"
              onChange={handleFileUpload}
            />
          </Form.Group>

          <Button type="submit" variant="success">
            Update Profile
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default UpdateProfile;
