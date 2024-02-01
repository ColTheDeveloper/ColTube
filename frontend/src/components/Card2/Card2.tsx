import axios from "axios"
import { useEffect, useState } from "react"
import { format } from "timeago.js"
import "./Card2.css"
import { Link } from "react-router-dom"
import { userType, videoType } from "../../types/pagePropsTypes"

type Card2Type={
    video:videoType
}
const Card2=({video}:Card2Type)=>{
    const [channel,setChannel]= useState<userType | null >(null)

    useEffect(()=>{
        const fetchCardData=async()=>{
            try {
                const res= await axios.get(`${import.meta.env.VITE_API_URL}/users/${video.userId}`)
                setChannel(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCardData()
    },[video])

    return(
        <Link to={`/video/${video._id}`}>
            <div className="Card2">
                <div>
                    <img src={video.imgUrl} alt="video" />    
                </div>
                <div>
                    <p>{video.title}</p>
                    <p>{channel?.name}</p>
                    <p>{video?.views} views • {format(video.createdAt)}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card2