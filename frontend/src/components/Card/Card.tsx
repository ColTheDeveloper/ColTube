import "./Card.css"
//import thumbnail from "../../assets/thumbnail.png"
import profilePics from "../../assets/profile.jpg"
import {format} from "timeago.js"
import { Link } from "react-router-dom"

const Card=({video}:any)=>{
    return(
        <Link to={`/video/${video._id}`}>
            <div className="Card">
                <img src={video.imgUrl} alt={video.title} />
                <div className="Card-details">
                    <div>
                        <img src={profilePics} alt="profilePics" />
                    </div>
                    <div>
                        <h3>{video.title}</h3>
                        <span>colthedeveloper</span>
                        <span>{video.views} views - {format(video.createdAt)}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default Card