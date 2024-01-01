import { createSlice } from "@reduxjs/toolkit"
import { userType } from "../types/pagePropsTypes"

type userSliceType={
    user: null | userType,
    loading:boolean,
    error:boolean
}


const initialState:userSliceType={
    user:null,
    loading:false,
    error:false
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading=false
        },
        loginSuccess:(state,action)=>{
            state.user=action.payload
            state.loading=false
        },
        loginFailure:(state)=>{
            state.error=true
            state.loading=false
        },
        logout:(state)=>{
            state.user=null
            state.error=false
            state.loading=false
        },
        subscription:(state,action)=>{
            if(state.user?.subscribedUsers.includes(action.payload)){
                state.user.subscribedUsers.splice(
                    state.user.subscribedUsers.findIndex((channelId)=>channelId===action.payload),1
                )
            }else{
                state.user?.subscribedUsers.push(action.payload)
            }
        }
    }
})

export const {loginStart,loginSuccess,loginFailure,logout, subscription}=userSlice.actions

export default userSlice.reducer