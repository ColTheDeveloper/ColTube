import axios from "axios";
import { useEffect, useState } from "react";
//import Card from "../Card/Card";
import Card2 from "../Card2/Card2";
import "./Recommendation.css"
import { videoType } from "../../types/pagePropsTypes";

type recommendationProps={
    tags:string[] | undefined
}
const Recommendation=({tags}:recommendationProps)=>{
    const [videos, setVideos]=useState<videoType[] | null >(null)

    useEffect(()=>{
        const fetchVideo=async()=>{
            try {
                if(tags){
                    const res= await axios.get(`${import.meta.env.VITE_API_URL}/videos/tags?tags=${tags}`)
                    setVideos(res.data)
                }else{
                    const res= await axios.get(`${import.meta.env.VITE_API_URL}/videos/random`)
                    setVideos(res.data)
                    
                }
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
                    <Card2 key={video._id} video={video} />
                )
            })}

        </div>
    )
}
export default Recommendation;