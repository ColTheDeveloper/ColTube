import { useEffect, useState } from "react";
import "./CommentCard.css"
import { format } from "timeago.js";
import axios from "axios";
import { commentProps,  userType } from "../../types/pagePropsTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CommentCard=({comment}:commentProps)=>{
    const [commentWriter,setCommentWriter]= useState< userType | null >(null)
    const {user}=useSelector((state:RootState)=>state.user)
    useEffect(()=>{
        const fetchCommentWriter=async()=>{
            try {
                const res= await axios.get(`${import.meta.env.VITE_API_URL}/users/${comment.userId}`)
                setCommentWriter(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCommentWriter()
    },[comment])

    const deleteComment=async()=>{
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/comments/${comment._id}`,{withCredentials:true})
            alert("comment successfully deleted")

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="CommentCard">
            <div>
                <div className="CommentCard-img-container">
                    <img src={commentWriter?.img} alt="" width={35}/>    
                </div>
                <div className="CommentCard-details-container">
                    <span className="CommentCard-author-container">
                        <p>{commentWriter?.name}</p>
                        <p>{format(comment.createdAt)}</p>
                    </span>
                    <p>{comment.desc}</p>
                </div>
            </div>
            <div className="delete-btn-container">
                {user?._id===comment.userId&&
                    <i onClick={()=>deleteComment()} className="ri-delete-bin-6-line"></i>
                }
            </div>
        </div>
    )
}

export default CommentCard;