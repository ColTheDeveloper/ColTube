import axios from "axios";
import Card from "../../components/Card/Card";
import "./Home.css"
import { useEffect, useState } from "react";

type VideoPropType={
    type:string
}

const Home=({type}:VideoPropType)=>{
    console.log(type)
    const [videos,setVideos]=useState([])

    
    useEffect(()=>{
        const loadVideo=async()=>{
            try {
                const response= await axios.get(`http://localhost:2500/api/videos/${type}`)
                console.log(response)
                setVideos(response.data)
            } catch (error) {
                console.log(error)
                
            }
        }
        loadVideo()
    },[type])
    return(
        <div className="Home Body">
            <div className="Card-container">
                {videos.map((video)=>{
                    return(
                        <Card video={video} />
                    )
                })} 
            </div>
        </div>
    )
}
export default Home;