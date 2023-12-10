import { createSlice } from "@reduxjs/toolkit"

type videoSliceType={
    currentVideo: null | string,
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
        }
    }
})

export const {fetchVideoStart,fetchVideoSuccess,fetchVideoFailure}=videoSlice.actions

export default videoSlice.reducer