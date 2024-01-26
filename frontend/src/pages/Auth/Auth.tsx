import { useEffect, useState } from "react"
import "./Auth.css"
import axios,{AxiosError} from "axios"
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { auth, provider } from "../../firebase"
import { signInWithPopup } from "firebase/auth"
import { RootState } from "../../redux/store"
import { useNavigate } from "react-router-dom"


const Auth=()=>{
    const dispatch=useDispatch()
    const {user}=useSelector((state:RootState)=>state.user)
    const navigate= useNavigate()
    const [isSigninForm,setIsSigninForm]=useState(true)
    const [error,setError]=useState(false)
    const [errMsg,setErrMsg]=useState("")
    const [signinData,setSigninData]=useState({
        email:"",
        password:""
    })
    const [signupData,setSignupData]=useState({
        name:"",
        email:"",
        password:""
    })

    useEffect(()=>{
        if(user) navigate("/")
    },[navigate,user])

    useEffect(()=>{
        setError(false)
        setErrMsg("")
    },[signupData,signinData])

    const handleSignupChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSignupData({...signupData,[e.target.name]:e.target.value})
    }

    const handleSigninChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSigninData({...signinData,[e.target.name]:e.target.value})
    }

    const handleSigninSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            dispatch(loginStart())
            const response= await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,signinData,{withCredentials:true})
            dispatch(loginSuccess(response.data))
            console.log(response.data)
        } catch (err) {
            const error = err as AxiosError<Error>;
            dispatch(loginFailure())
            setError(true)
            setErrMsg(error.response.data.message )
        }
        
    }
    const signinWithGoogle=async()=>{
        signInWithPopup(auth,provider).then((result)=>{
            console.log(result)
            axios.post(`${import.meta.env.VITE_API_URL}/auth/google"`,{
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
    const handleSignupSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        if(signupData.password.length<=5){
            setError(true)
            setErrMsg("Password must be more that 5 words!")
        }
        e.preventDefault()
        try {
            dispatch(loginStart())
            const response= await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,signupData,{withCredentials:true})
            dispatch(loginSuccess(response.data))
            console.log(response.data)
        } catch (err) {
            const error = err as AxiosError<Error>;
            dispatch(loginFailure())
            setError(true)
            setErrMsg(error.response.data.message)
        }
        console.log(signupData)

    }
    return(
        <div className="Auth Body">
            <div className="Auth-form-container">
                {isSigninForm?
                    <form onSubmit={(e)=>handleSigninSubmit(e)}>
                        <h1>Sign in</h1>
                        <p>to continue on ColTube</p>
                        <input 
                            type="text" 
                            placeholder="email" 
                            name="email" 
                            value={signinData.email} 
                            onChange={(e)=>handleSigninChange(e)} 
                            className="input"
                        />

                        <input 
                            type="password" 
                            placeholder="password" 
                            name="password" 
                            value={signinData.password} 
                            onChange={(e)=>handleSigninChange(e)} 
                            className="input"
                        />
                        {error&&<span className="err-msg"><i className="ri-error-warning-fill"></i> <p>{" "}{errMsg}</p></span>}

                        <button type="submit">Sign in</button>
                        <p className="signing-text">No account yet?<span onClick={()=>setIsSigninForm(false)}> Sign up</span></p>
                        <button  onClick={()=>signinWithGoogle()}>Sign in with Google</button>
                    </form>
                :
                
                <form onSubmit={(e)=>handleSignupSubmit(e)}>
                        <h1>Sign up</h1>
                        <p>to continue on ColTube</p>
                        <input 
                            type="text" 
                            placeholder="name" 
                            name="name" 
                            onChange={(e)=>handleSignupChange(e)} 
                            value={signupData.name} 
                            className="input"
                        />

                        <input 
                            type="email" 
                            placeholder="email" 
                            name="email" 
                            onChange={(e)=>handleSignupChange(e)} 
                            value={signupData.email} 
                            className="input"
                            />

                        <input 
                            type="password" 
                            placeholder="password" 
                            name="password" 
                            onChange={(e)=>handleSignupChange(e)} 
                            value={signupData.password} 
                            className="input"
                            />
                        {error&&<span className="err-msg"><i className="ri-error-warning-fill"></i> <p>{" "}{errMsg}</p></span>}

                        <button type="submit">Sign up</button>
                        <p className="signing-text">Already had an account?<span onClick={()=>setIsSigninForm(true)}> Sign in</span></p>
                        <button  onClick={()=>signinWithGoogle()}>Sign in with Google</button>
                    </form>
                }
            </div>
        </div>
    )
}
export default Auth;