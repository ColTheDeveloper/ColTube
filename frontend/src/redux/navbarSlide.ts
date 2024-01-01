import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isNavbarOpen:false
}

export const navbarSlice=createSlice({
    name:"navbar",
    initialState,
    reducers:{
        openNavbar:(state)=>{
            state.isNavbarOpen=true
        },
        closeNavbar:(state)=>{
            state.isNavbarOpen=false
        }
    }
})

export const {openNavbar,closeNavbar}=navbarSlice.actions

export default navbarSlice.reducer