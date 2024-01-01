import axios from "axios";
import { useEffect, useState } from "react";
//import Card from "../Card/Card";
import Card2 from "../Card2/Card2";
import "./Recommendation.css"


const Recommendation=({tags})=>{
    const [videos, setVideos]=useState(null)

    useEffect(()=>{
        const fetchVideo=async()=>{
            try {
                //const res= await axios.get(`${import.meta.env.VITE_API_URL}/videos/tags?tag=${tags}`)
                const res= await axios.get(`${import.meta.env.VITE_API_URL}/videos/random`)
                setVideos(res.data)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        fetchVideo()
    },[tags])
    return(
        <div className="Recommendation">
            {videos?.map((video)=>{
                return(
                    <Card2 video={video} />
                )
            })}

        </div>
    )
}
export default Recommendation;