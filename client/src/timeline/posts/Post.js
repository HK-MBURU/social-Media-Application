import React from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'
import { Comment, Download, FavoriteBorder, MoreHoriz, Send, Share } from '@mui/icons-material'
import hk from '../../images/hk1.jpg'


function Post({user,postImage,likes,timestamp}) {
    
    
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
                    <FavoriteBorder className='postIcon'/>
                    <Comment className='postIcon'/>
                    <input type="text" placeholder='type your comment here' className='comment'/>
                    <Send className='postIcon sendBtn comment'/>

                </div>
                <div className="post__iconSave">
                    <Share className='postIcon'/>
                    

                </div>
            </div>
            <p>liked by {likes} people</p>
        </div>
    </div>
  )
}

export default Post