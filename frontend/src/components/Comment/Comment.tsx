import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "./Comment.css"
import { RootState } from "../../redux/store"
import CommentCard from "../CommentCard/CommentCard"
import axios from "axios"
import { commentType, videoIdProps } from "../../types/pagePropsTypes"



const Comment=({videoId}:videoIdProps)=>{
    const [comments,setComments]=useState< commentType[] | null>(null)
    const {user}=useSelector((state:RootState)=>state.user)
    const [commentForm,setCommentForm]=useState("")
    const [isLoading,setIsLoading]=useState(false)

    useEffect(()=>{
        const fetchComment=async()=>{
            try {
                const res= await axios.get(`${import.meta.env.VITE_API_URL}/comments/${videoId}`)
                setComments(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchComment()
    },[videoId])

    const createComment=async()=>{
        setIsLoading(true)
        try {
            const res= await axios.post(`${import.meta.env.VITE_API_URL}/comments`,{desc:commentForm,"videoId":videoId},{withCredentials:true})
            setComments((prev)=>([res.data,...(prev as commentType[])]))
            setCommentForm("")
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="Comment">
            <h2>{comments?.length} Comments</h2>
            {user &&
                <div>
                    <div className="Comment-input-container">
                        <div>
                            <img src={user?.img} alt={user?.name} width={35} />
                        </div>
                        <div>
                            <input type="text" value={commentForm} onChange={e=>setCommentForm(e.target.value)} placeholder="Add a comment..." />
                        </div>
                    </div>
                    <div className="Comment-btn-container">
                        <button onClick={()=>setCommentForm("")}>Cancel</button>
                        <button onClick={()=>createComment()} disabled={commentForm.length==0 || isLoading?true:false}>Comment</button>
                    </div>
                </div>
            }
            <div className="Comment-main-container">
                {comments?.map((comment)=>{
                    return(
                        <CommentCard  comment={comment} />
                    )
                })}
            </div>

        </div>
    )
}

export default Comment