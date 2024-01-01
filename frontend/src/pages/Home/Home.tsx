import axios from "axios";
import Card from "../../components/Card/Card";
import "./Home.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { closeNavbar } from "../../redux/navbarSlide";
import Spinner from "../../components/Spinner/Spinner"
import { videoType } from "../../types/pagePropsTypes";

type VideoPropType={
    type:string
}

const Home=({type}:VideoPropType)=>{
    const [videos,setVideos]=useState<videoType[] | null>(null)
    const {user}= useSelector((state:RootState)=>state.user)
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    
    useEffect(()=>{
        dispatch(closeNavbar())
        const loadVideo=async()=>{
            if(type==="sub" && !user){
                navigate("/auth")
            }
            if(type==="sub"){
                setIsLoading(true)
                const response= await axios.get(`http://localhost:2500/api/videos/${type}`,{withCredentials:true})
                console.log(response)
                setIsLoading(false)
                setVideos(response.data)
            }else{
                setIsLoading(true)
                const response= await axios.get(`http://localhost:2500/api/videos/${type}`)
                console.log(response)
                setIsLoading(false)
                setVideos(response.data)
            }
        }
        loadVideo()
    },[type,user,navigate,dispatch])
    return(
        <div className="Home Body">
            {isLoading?
                
                <Spinner />
                
            :
                videos?.length===0?
                    <div className="Loading">
                        <h1>No Video Available</h1>
                    </div>
                :
                    <div className="Card-container">
                        {videos?.map((video)=>{
                            return(
                                <Card video={video} />
                            )
                        })} 
                    </div>
            }
        </div>
    )
}
export default Home;