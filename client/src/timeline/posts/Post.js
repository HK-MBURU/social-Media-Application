import React, { useState } from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'
import { Comment, Download, FavoriteBorder, MoreHoriz, Send, Share } from '@mui/icons-material'
import hk from '../../images/hk1.jpg'
import Comments from './comments/Comments'



function Post({user,postImage,likes,timestamp,postId,content}) {
    console.log(user);

    const [showComments,setShowComments]=useState(false)
    const handleCommentClick=()=>{
        setShowComments(!showComments)
    }
    
    
    
    
  return (
    <div className='post '>
        {/* <input
            type="text"
            placeholder="Craeate Post"
            readOnly
           
            className="form-control bg-light border-0 position-fixed top-0 start-50 translate-middle-x"
            style={{zIndex:9999,  width:"540px"}}
          /> */}
        <div className="post__header" style={{maxWidth:'400px'}}>
            <div className="post__headerAuthor">
                 <Avatar>{user && user.charAt(0).toUpperCase()}</Avatar>
            {user} * <span>{timestamp}</span>
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
                    <FavoriteBorder className='postIcon like'/>
                    <Comment className='postIcon commentBtn' onClick={handleCommentClick }/>

                </div>
                <div className="post__iconSave">
                    <Share className='postIcon'/>
                    

                </div>
            </div>
            <p>liked by {likes} people</p>
            
            {showComments && <Comments currentUserId="1"/>}
        </div>
    </div>
  )
}

export default Post