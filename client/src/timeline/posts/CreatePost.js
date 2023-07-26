import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form, Image, OverlayTrigger, Tooltip } from "react-bootstrap";

function CreatePost() {
  const preset_key = "amodduyt";
  const cloud_name = "dkpnavrhu";
  const [image, setImage] = useState("");
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading]=useState(false)
  const [progress, setProgress]=useState(0)
  const [isActive,setIsActive]=useState(true)

  const handleFileUpload = async () => {
    try {if (!file) {
        alert("Please select an image to upload")
        return 
        
    }

    setUploading(true)
    
    const file_u = file;
    const formData = new FormData();
    formData.append("file", file_u);
    formData.append("upload_preset", preset_key);
    
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,{withCredentials:false},
        {
            onUploadProgress:(ProgressEvent)=>{
                const{loaded,total}=ProgressEvent
                const percentageCompleted=Math.round((loaded *100)/total)
                setProgress(percentageCompleted)
            },
            
        }
      );
      const imageUrl=response.data.secure_url
      console.log("Image uploaded :",response.data);
      console.log("This is the image url gotten",imageUrl);
      setImage(imageUrl)
      console.log("Image url at handle file upload function",image);
      

      setUploading(false)
      setProgress(0)
      setIsActive(false)
      setFile(null)
    //   setImage(null)

    } catch (error) {
        console.error("Error uploading image:",error);
        setUploading(false)
        setProgress(0)
        console.log(error);
    }
  };


  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleCreatePost = async () => {
    if(isActive){
        alert("Upload first before creating post")
    }
    try {
    //  console.log("Image url is: ", image);
      const postData = {
        content: postText,
        image_url:image,
      };
      

      const response = await axios.post("/createPost", postData);
      console.log("Post created:", response.data);
      setPostText("");
      setFile(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  const tooltip=(
    <Tooltip id="tooltip">Upload first before creating a post</Tooltip>
  )
  return (
    
    <div className="container mt-4">
        {/* <div>
        <OverlayTrigger
        placement="top"
        overlay={tooltip}
        show={isActive}
        > <span>
        <Button
          variant="success"
          onClick={handleCreatePost}
          className="mt-2 mx-5"
          disabled={isActive}
        >
          Create Post
        </Button>
      </span></OverlayTrigger>
    </div> */}
      <div className="card">
        <div className="card-body">
          <Form>
            <Form.Group controlId="postText">
              <Form.Label>Caption:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={postText}
                onChange={handlePostTextChange}
                placeholder="Whats on your mind?"
              />
            </Form.Group>
            <Form.Group controlId="postFile">
              <Form.Label>Select a file(image or video) to post:</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept="image/*,video/*"
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleFileUpload}
              className="mt-2"
            >
              Upload Post
            </Button>
            <Button
              variant="success"
              onClick={handleCreatePost}
              className="mt-2 mx-5"
              disabled={isActive}
            >
              Create Post
            </Button>
          </Form>
        </div>
      </div>

      {file && (
        <Card className="mt-4">
          <Card.Body>
            {file.type.startsWith("image/") ? (
              <Image
                src={URL.createObjectURL(file)}
                fluid
                style={{ maxWidth: "200px" }}
              />
            ) : file.type.startsWith("video/") ? (
              <video width="200px" height="150px" controls>
                <source src={URL.createObjectURL(file)} type={file.type} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Unsupported file type</p>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default CreatePost;
