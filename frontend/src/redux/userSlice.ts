import { createSlice } from "@reduxjs/toolkit"

type userSliceType={
    user: null | string,
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
        layout:(state)=>{
            state.user=null
            state.error=false
            state.loading=false
        }
    }
})

export const {loginStart,loginSuccess,loginFailure,layout}=userSlice.actions

export default userSlice.reducer