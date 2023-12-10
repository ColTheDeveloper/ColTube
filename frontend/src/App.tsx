//import { useState } from 'react'
//import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Auth from './pages/Auth/Auth'
import Video from './pages/Video/Video'
import Home from './pages/Home/Home'

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
        path:"/subscription",
        element:<Home type='sub' />
      },
      {
        path:"/auth",
        element:<Auth />
      },
      {
        path:"/video/:videoId",
        element:<Video />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
