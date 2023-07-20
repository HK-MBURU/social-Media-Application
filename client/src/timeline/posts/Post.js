import React, { useState } from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'
import { Comment, Download, FavoriteBorder, MoreHoriz, Send, Share } from '@mui/icons-material'
import hk from '../../images/hk1.jpg'
import Comments from './comments/Comments'


function Post({user,postImage,likes,timestamp,postId}) {

    const [showComments,setShowComments]=useState(false)
    const handleCommentClick=()=>{
        setShowComments(!showComments)
    }
    
    
    
    
  return (
    <div className='post'>
        <div className="post__header">
            <div className="post__headerAuthor">
                 <Avatar>{user && user.charAt(0).toUpperCase()}</Avatar>
            {user} * <span>{timestamp}</span>
            </div>
           <MoreHoriz/>
        </div>
        <div className="post__image">
            <img src={postImage} alt="" />
        </div>
        <div className="post__footer">
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