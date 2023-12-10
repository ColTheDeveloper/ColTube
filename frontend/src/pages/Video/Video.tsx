import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoFailure, fetchVideoStart, fetchVideoSuccess } from "../../redux/videoSlice";

const Video=()=>{
    const {videoId}= useParams()
    const dispatch=useDispatch()
    //const [videoData, setVideoData]=useState({})
    const [channelData,setChannelData]=useState({})

    useEffect(()=>{
        const loadPageInfo=async()=>{
            try {
                dispatch(fetchVideoStart())
                const videoRes= await axios.get(`http://localhost:2500/api/videos/${videoId}`)
                const channelRes= await axios.get(`http://localhost:2500/api/users/${videoRes.data.userId}`)
                dispatch(fetchVideoSuccess(videoRes.data))
                setChannelData(channelRes.data)
            } catch (error) {
                dispatch(fetchVideoFailure())
                console.log(error)
            }
        }
        loadPageInfo()

    },[videoId,dispatch])
    
    return(
        <div className="Body Video">
        <h1>{videoId}</h1>
        <h1>hello</h1>
        <h1>{videoId}</h1>
        </div>
    )
}
export default Video;