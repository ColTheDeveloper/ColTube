//import { useState } from 'react'
//import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Auth from './pages/Auth/Auth'
import Video from './pages/Video/Video'
import Home from './pages/Home/Home'
import Search from "./pages/Search/Search"
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from './redux/userSlice'

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
        path:"/auth",
        element:<Auth />
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
  const [cookies]=useCookies(["access_token"])
  const dispatch=useDispatch()
  
  useEffect(()=>{
    if(!cookies.access_token){
      dispatch(logout())
    }
  },[cookies,dispatch])
  return (
      <RouterProvider router={router} />
  )
}

export default App
