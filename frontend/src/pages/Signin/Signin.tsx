import axios from "axios"
import { signInWithPopup } from "firebase/auth"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { auth, provider } from "../../firebase"
import { loginFailure, loginSuccess } from "../../redux/userSlice"
import googleImg from "../../assets/google.png"
import "./Signin.css"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../redux/store"


const Signin=()=>{
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const {user}=useSelector((state:RootState)=>state.user)
    const [error,setError]=useState(false)
    const [errMsg,setErrMsg]=useState("")

    useEffect(()=>{
        if(user) navigate("/")
    },[navigate,user])

    const signinWithGoogle=async()=>{
        signInWithPopup(auth,provider).then((result)=>{
            axios.post(`${import.meta.env.VITE_API_URL}/auth/google`,{
                name:result.user.displayName,
                email:result.user.email,
                img:result.user.photoURL
            },{withCredentials:true}).then((res)=>{
                dispatch(loginSuccess(res.data))
            }).catch((err)=>{
                console.log(err)
                dispatch(loginFailure())
                setError(true)
                setErrMsg("An error occur try again!")
                
            })
        })
    }
    return(
        <div className="Body Signin">
            <div onClick={()=>signinWithGoogle()}>
                <img src={googleImg} alt="google icon"  width={30}/>
                <h2>Sign in with Google</h2>
            </div>
            {error && errMsg !=""?<p>{errMsg}</p>:""}
        </div>
    )
}
export default Signin