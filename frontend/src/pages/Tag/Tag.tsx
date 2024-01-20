import axios from "axios";
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { closeNavbar } from "../../redux/navbarSlide";
import Spinner from "../../components/Spinner/Spinner"
import { videoType } from "../../types/pagePropsTypes";
import { useSearchParams } from "react-router-dom";

// type VideoPropType={
//     tag:string
// }

const Tag=()=>{
    const [videos,setVideos]=useState<videoType[] | null>(null)
    const [isLoading,setIsLoading]=useState(false)
    const [tagParams]=useSearchParams()
    const dispatch=useDispatch()

    const tag=tagParams.get("tag")

    console.log(tag)

    
    useEffect(()=>{
        dispatch(closeNavbar())
        const loadVideo=async()=>{
            setIsLoading(true)
            const response= await axios.get(`http://localhost:2500/api/videos/${tag}`,{withCredentials:true})
            console.log(response)
            setIsLoading(false)
            setVideos(response.data)
        }
        loadVideo()
    },[tag,dispatch])
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
export default Tag;