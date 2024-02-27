//import { useState } from 'react'
//import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
//import Auth from './pages/Auth/Auth'
import Video from './pages/Video/Video'
import Home from './pages/Home/Home'
import Search from "./pages/Search/Search"
//import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './redux/userSlice'
import Tag from './pages/Tag/Tag'
import { RootState } from './redux/store'
import Signin from './pages/Signin/Signin'

const router=createBrowserRouter([
  {
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home type='random' />
      },
      {
        path:"/explore",
        element:<Home type='trend' />
      },
      {
        path:"/sub",
        element:<Home type='sub' />
      },
      {
        path:"/trend",
        element:<Home type='trend' />
      },
      {
        path:"/auth",
        element:<Signin />
      },
      {
        path:"/tags",
        element:<Tag />
      },
      {
        path:"/video/:videoId",
        element:<Video />
      },
      {
        path:"/search",
        element: <Search />
      },
    ]
  }
])

function App() {
  //const [cookies]=useCookies(["access_token"])
  const dispatch=useDispatch()
  const logOutDate=useSelector((state:RootState)=>state.user.logOutDate)
  
  // useEffect(()=>{
  //   if(!cookies.access_token){
  //     dispatch(logout())
  //   }
  // },[cookies,dispatch])
  useEffect(()=>{
    const compareDate=()=>{
      if(logOutDate==null){
        return
      }else{
        const currentDate=new Date()
        // console.log(currentDate)
        const savedDate= new Date(logOutDate)
        // console.log(savedDate)
        if(currentDate>=savedDate){
          dispatch(logout())
        }
      }
      
    }
    compareDate()
    
  },[dispatch,logOutDate])
  return (
      <RouterProvider router={router} />
  )
}

export default App
