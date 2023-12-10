import { useState } from "react"
import "./Auth.css"
import axios from "axios"
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice"
import { useDispatch } from "react-redux"
import { auth, provider } from "../../firebase"
import { signInWithPopup } from "firebase/auth"

const Auth=()=>{
    const dispatch=useDispatch()
    const [isSigninForm,setIsSigninForm]=useState(true)
    const [signinData,setSigninData]=useState({
        name:"",
        password:""
    })
    const [signupData,setSignupData]=useState({
        name:"",
        email:"",
        password:""
    })

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
            const response= await axios.post("http://localhost:2500/api/auth/signin",signinData)
            dispatch(loginSuccess(response.data))
            console.log(response.data)
        } catch (error) {
            dispatch(loginFailure())
        }
        
    }
    const signinWithGoogle=async()=>{
        signInWithPopup(auth,provider).then((result)=>{
            console.log(result)
            axios.post("http://localhost:2500/api/auth/google",{
                name:result.user.displayName,
                email:result.user.email,
                img:result.user.photoURL
            }).then((res)=>{
                dispatch(loginSuccess(res.data))
            }).catch((err)=>{
                console.log(err)
                dispatch(loginFailure())
            })
        })
    }
    const handleSignupSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            dispatch(loginStart())
            const response= await axios.post("http://localhost:2500/api/auth/signup",signupData)
            dispatch(loginSuccess(response.data))
            console.log(response.data)
        } catch (error) {
            dispatch(loginFailure())
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
                            placeholder="name" 
                            name="name" 
                            value={signinData.name} 
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

                        <button type="submit">Sign in</button>
                        <p>No account yet?<span onClick={()=>setIsSigninForm(false)}> Sign up</span></p>
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

                        <button type="submit">Sign up</button>
                        <p>Already had an account?<span onClick={()=>setIsSigninForm(true)}> Sign in</span></p>
                        <button  onClick={()=>signinWithGoogle()}>Sign in with Google</button>
                    </form>
                }
            </div>
        </div>
    )
}
export default Auth;