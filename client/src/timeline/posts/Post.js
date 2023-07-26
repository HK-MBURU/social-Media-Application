import React, { useState } from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'
import { Comment, Download, Favorite, FavoriteBorder, MoreHoriz, Send, Share } from '@mui/icons-material'
import hk from '../../images/hk1.jpg'
import Comments from './comments/Comments'
import axios from 'axios';




function Post({user,postImage,likes,timestamp,postId,content,profilePic}) {
    // console.log(user);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        if (!isLiked) {
          // Make a POST request to your backend endpoint to add the like
          axios.post('localhost:5050/like')
            .then((response) => {
              // Update the state to reflect that the post has been liked
              setIsLiked(true);
            })
            .catch((error) => {
              console.error('Error liking the post:', error);
            });
        }
      };

    const [showComments,setShowComments]=useState(false)
    const handleCommentClick=()=>{
        setShowComments(!showComments)
    }
    
    const createdAt = new Date(timestamp).toLocaleDateString();
    // let b=false
    
    
  return (
    <div className='post '>
        
        <div className="post__header" style={{maxWidth:'400px'}}>
            <div className="post__headerAuthor">
                 <Avatar>{<img src={profilePic}/> || user.charAt(0).toUpperCase()}</Avatar>
            {user} * <span>{createdAt}</span>
            </div>
           <MoreHoriz/>
        </div>
        <p>{content}</p>
        
        <div className="post__image">
            <img src={postImage} alt="" className='img-fluid rounded post-image' style={{maxWidth:'400px'}}/>
        </div>
        <div className="post__footer" style={{maxWidth:'400px'}}>
            <div className="post__footerIcons">
                <div className="post_iconsMain">
                    {/* <FavoriteBorder className='postIcon like'/> */}
                    {isLiked ? <Favorite className="postIcon like" onClick={handleLike} style={{ color: 'red' }} /> : <FavoriteBorder className="postIcon like" />}
                    <Comment className='postIcon commentBtn' onClick={handleCommentClick }/>

                </div>
                <div className="post__iconSave">
                    <Share className='postIcon'/>
                    

                </div>
            </div>
            <p>liked by {likes} people</p>
            
            {showComments && <Comments currentUserId="1" />}
           {/* { <Comment pic={profilePic}/>} */}
        </div>
    </div>
  )
}

export default Post