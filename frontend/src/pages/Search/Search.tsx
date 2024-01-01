import { useEffect, useState } from "react"
import {useSearchParams} from "react-router-dom"
import { videoType } from "../../types/pagePropsTypes"
import axios from "axios"
import Spinner from "../../components/Spinner/Spinner"
import Card from "../../components/Card/Card"

const Search=()=>{
    const [searchParams]=useSearchParams()
    const [videos,setVideos]=useState<videoType[]|null>(null)
    const [isLoading,setIsLoading]=useState(true)

    const search=searchParams.get("search")

    useEffect(()=>{
        const loadSearch=async()=>{
            setIsLoading(true)
            const response= await axios.get(`${import.meta.env.VITE_API_URL}/videos/search?q=${search}`)
            console.log(response)
            setIsLoading(false)
            setVideos(response.data)
        }
        loadSearch()
    },[search])
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
export default Search;