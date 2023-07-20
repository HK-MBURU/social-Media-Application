import React, { useEffect, useState } from "react";
import "./updateProfile.css";
import axios from "axios";
import { Form, Button, Col, Dropdown, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FlagSelect from "react-flags-select";
// import "react-flag-select/css/react-flags-select.css"

function UpdateProfile() {
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const fileInputRef=React.createRef()

  const preset_key=""
  const cloud_name=""
  const [image,setImage]=useState()

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const formData=new FormData()
    formData.append('file',file)
    formData.append("upload_preset",preset_key)
    axios.post(``,formData)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    // setProfilePicture(file);
    fileInputRef.current.value=""
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");

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
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const formData = {
        userName,
        bio,
        location: selectedCountry.name.common,
        profilePicture,
      };
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

  console.log("Updated Profile:", {
    userName,
    bio,
    location,
    selectedCountry,
  });

  return (
    <Row className="mt-5 wholeForm">
      <Col md={{ span: 6, offset: 3 }}>
        <Form onSubmit={handleSubmit} className="custom-form">
          <h3>Update Profile</h3>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></Form.Control>
          </Form.Group>

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
