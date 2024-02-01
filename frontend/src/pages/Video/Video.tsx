import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { dislikeVideo, fetchVideoFailure, fetchVideoStart, fetchVideoSuccess, likeVideo } from "../../redux/videoSlice";
import { RootState } from "../../redux/store";
import "./Video.css"
import { format } from "timeago.js";
import Comment from "../../components/Comment/Comment";
import Recommendation from "../../components/Recommendation/Recommendation";
import { userType } from "../../types/pagePropsTypes";
import { subscription } from "../../redux/userSlice";
import Spinner from "../../components/Spinner/Spinner";

const Video=()=>{
    const {videoId}= useParams()
    const dispatch=useDispatch()
    //const [videoData, setVideoData]=useState({})
    const [channelData,setChannelData]=useState<userType | null>(null)
    const [isLoading,setIsLoading]=useState(true)
    const {currentVideo}= useSelector((state:RootState)=>state.video)
    const {user}=useSelector((state:RootState)=>state.user)

    useEffect(()=>{
        const loadPageInfo=async()=>{
            try {
                dispatch(fetchVideoStart())
                setIsLoading(true)
                const videoRes= await axios.get(`${import.meta.env.VITE_API_URL}/videos/${videoId}`)
                const channelRes= await axios.get(`${import.meta.env.VITE_API_URL}/users/${videoRes.data.userId}`)
                dispatch(fetchVideoSuccess(videoRes.data))
                setChannelData(channelRes.data)
                setIsLoading(false)
            } catch (error) {
                dispatch(fetchVideoFailure())
                console.log(error)
            }
        }
        loadPageInfo()

    },[videoId,dispatch])
    
    const addViews=async()=>{
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/videos/views/${currentVideo?._id}`)
        } catch (error) {
            
            console.log(error)    
        }
    }

    const handleLikes=async()=>{
        await axios.put(`${import.meta.env.VITE_API_URL}/users/like/${currentVideo?._id}`,{},{withCredentials:true})
        dispatch(likeVideo(currentVideo?._id))
    }

    const handleDislikes=async()=>{
        await axios.put(`${import.meta.env.VITE_API_URL}/users/dislike/${currentVideo?._id}`,{},{withCredentials:true})
        dispatch(dislikeVideo(currentVideo?._id))
    }

    const handleSubscription=async()=>{
        if(user?.subscribedUsers.includes(channelData?._id as string)){
            await axios.put(`${import.meta.env.VITE_API_URL}/users/unsub/${channelData?._id}`,{},{withCredentials:true})
            dispatch(subscription(channelData?._id))
        }else{
            await axios.put(`${import.meta.env.VITE_API_URL}/users/sub/${channelData?._id}`,{},{withCredentials:true})
            dispatch(subscription(channelData?._id))
        }
    }
    return(
        <div className="Body">
            <div className="Video">
                {isLoading?
                    <Spinner />
                :
                    <div className="video-det-container">
                        <video src={currentVideo?.videoUrl} onPlay={()=>addViews()} poster={currentVideo?.imgUrl} className="video-play" muted={false}  controls/>
                        <h1>{currentVideo?.title}</h1>
                        <div>
                            <div className="video-channel">
                                <div>
                                    <img src={channelData?.img} alt={channelData?.name} />
                                </div>
                                <div>
                                    <h3>{channelData?.name}</h3>    
                                    <p>{channelData?.subscribers} subscribers</p>    
                                </div>
                                <div>
                                    {user?
                                        <button onClick={()=>handleSubscription()}>
                                            {user?.subscribedUsers.includes(channelData?._id as string)?
                                                "Subscribed" 
                                                :
                                                "Subscribe" 
                                            }

                                        </button>
                                        :
                                        ""
                                    }
                                </div>
                            </div>
                            <div className="video-like-share">
                                {user?
                                    <div>
                                        <div onClick={()=>handleLikes()} className="video-share-btn">
                                            <i className="ri-thumb-up-line"></i>
                                            <p>{currentVideo?.likes.length}</p>
                                        </div>
                                        <div onClick={()=>handleDislikes()} className="video-share-btn">
                                            <i className="ri-thumb-down-line"></i>
                                            <p>{currentVideo?.dislikes.length}</p>
                                        </div>
                                    </div>
                                :
                                    ""
                                }
                                <div className="video-share-btn">
                                    <i className="ri-share-forward-line"></i>
                                    <p>share</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span>{currentVideo?.views} views {format(currentVideo?.createdAt as string)}</span>
                            <p>{currentVideo?.desc}</p>
                        </div>
                        <Comment videoId={currentVideo?._id as string}/>
                    </div>
                }
                <Recommendation tags={currentVideo?.tags} />
            </div>
        </div>
    )
}
export default Video;