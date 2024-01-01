import "./Card.css"
//import thumbnail from "../../assets/thumbnail.png"
import {format} from "timeago.js"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { userType, videoType } from "../../types/pagePropsTypes"
import thumbnail from "../../assets/defaultThumb.png"

type videoTypeProp={
    video:videoType
}
const Card=({video}:videoTypeProp)=>{
    const [channel,setChannel]=useState<userType | null>(null)
    const [imageSrc,setImageSrc]=useState(thumbnail)

    useEffect(()=>{
        const fetchCardData=async()=>{
            const res= await axios.get(`http://localhost:2500/api/users/${video.userId}`)
            setChannel(res.data)
        }
        fetchCardData()
        const imgLoader= new Image()

        imgLoader.onload=()=>{
            setImageSrc(video.imgUrl as string)
        }
        imgLoader.src=video.imgUrl as string

    },[video])

    // useEffect(()=>{
    //     const imgLoader= new Image()

    //     imgLoader.onload=()=>{
    //         setImageSrc(video.imgUrl as string)
    //     }
    //     imgLoader.src=video.imgUrl as string

    // },[])

    
    return(
        <Link to={`/video/${video._id}`}>
            <div className="Card">
                <img src={imageSrc} alt={video.title} />
                <div className="Card-details">
                    <div>
                        <img 
                            src={channel?.img} 
                            alt="profilePics"
                        />
                    </div>
                    <div>
                        <h3>{video.title}</h3>
                        <span>{channel?.name}</span>
                        <span>{video.views} views - {format(video.createdAt)}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default Card