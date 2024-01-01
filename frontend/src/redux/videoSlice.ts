import { createSlice } from "@reduxjs/toolkit"
import { videoType } from "../types/pagePropsTypes"

type videoSliceType={
    currentVideo: videoType | null,
    loading:boolean,
    error:boolean
}
const initialState:videoSliceType={
    currentVideo:null,
    loading:false,
    error:false
}

export const videoSlice=createSlice({
    name:"video",
    initialState,
    reducers:{
        fetchVideoStart:(state)=>{
            state.loading=false
        },
        fetchVideoSuccess:(state,action)=>{
            state.currentVideo=action.payload
            state.loading=false
        },
        fetchVideoFailure:(state)=>{
            state.error=true
            state.loading=false
        },
        likeVideo:(state,action)=>{
            if(!state.currentVideo?.likes.includes(action.payload)){
                state.currentVideo?.likes.push(action.payload)
                state.currentVideo?.dislikes.splice(
                    state.currentVideo.dislikes.findIndex((userId)=> userId === action.payload),1
                )
            }
        },
        dislikeVideo:(state,action)=>{
            if(!state.currentVideo?.dislikes.includes(action.payload)){
                state.currentVideo?.dislikes.push(action.payload)
                state.currentVideo?.likes.splice(
                    state.currentVideo.likes.findIndex((userId)=> userId === action.payload),1
                )
            }
        },
        
    }
})

export const {fetchVideoStart,fetchVideoSuccess,fetchVideoFailure,dislikeVideo,likeVideo}=videoSlice.actions

export default videoSlice.reducer