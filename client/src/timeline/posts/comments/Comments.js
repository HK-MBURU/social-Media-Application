import React, { useEffect, useState } from 'react'
import {getComments as getCommentsApi, createComment as createCommentApi, deleteComment as deleteCommentApi, updateComment as updateCommentApi } from "../api"
import "./comments.css"
import Comment from './Comment'
import CommentForm from './CommentForm'

function Comments({currentUserId}) {
    const [backendComments,setBackendComments]=useState([])
    const [activeComment,setActiveComment]=useState(null)
    const rootComments=backendComments.filter(
        (backendComment)=>backendComment.parentId===null
    )
    const getReplies=(commentId)=>{
        return backendComments
        .filter((backendComment)=>backendComment.parentId===commentId)
        .sort(
            (a,b)=>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
    }
    const addComment=(text,parentId)=>{
        console.log("addComment",text,parentId);
        createCommentApi(text,parentId).then(comment=>{
            setBackendComments([comment, ...backendComments])})
            setActiveComment(null)
    }
    const deleteComment=(commentId)=>{
        if(window.confirm("are you sure yo want to remove commnt?")){
            deleteCommentApi(commentId).then(()=>{
                const updateBackendComments=backendComments.filter(
                    (backendComment)=>backendComment.id !==commentId
                )
                setBackendComments(updateBackendComments)
            })

        }

    }
    const updateComment=(text,commentId)=>{
        updateCommentApi(text,commentId).then(()=>{
            const updateBackendComments=backendComments.map((backendComment)=>{
                if(backendComment.id===commentId){
                    return{...backendComment,body:text}
                }return backendComment
            })
            setBackendComments(updateBackendComments)
            setActiveComment(null)
        })
    }

    

    useEffect(()=>{
        getCommentsApi().then((data)=>{
            setBackendComments(data)
        })

    },[])
  return (
    <div className='comments'>
        <div className="comment-form-title">Comments</div>
        <CommentForm submitLabel="Write" handleSubmit={addComment}/>
        <div className="comments-container">
            {rootComments.map((rootComment)=>(
                <Comment key={rootComment.id} comment={rootComment}
                replies={getReplies(rootComment.id)}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                updateComment={updateComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}/>
            ))}
        </div>

    </div>
  )
}

export default Comments 