import axios from "axios"
import { useEffect, useState } from "react"
import { format } from "timeago.js"
import "./Card2.css"
import { Link } from "react-router-dom"


const Card2=({video}:any)=>{
    const [channel,setChannel]= useState(null)

    useEffect(()=>{
        const fetchCardData=async()=>{
            try {
                const res= await axios.get(`http://localhost:2500/api/users/${video.userId}`)
                setChannel(res.data)
                console.log(res)
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