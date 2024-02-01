import { useState } from "react";
import mainLogo from "../../assets/youtube-logo.png"
//import profilePics from "../../assets/profile.jpg"
import "./Header.css"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { openNavbar } from "../../redux/navbarSlide";


const Header=()=>{
    const [q, setQ]=useState("")
    const navigate=useNavigate()
    const [isSearchHeader,setSearchHeader]=useState(false)
    const dispatch=useDispatch()
    const [showCreateForm,setShowCreateForm]=useState(false)
    const [imgPercent,setImgPercent]=useState(0)
    const [uploading,setUploading]=useState(false)
    const [videoPercent,setVideoPercent]=useState(0)
    const {user}=useSelector((state:RootState)=>state.user)
    const [formData,setFormData]=useState({
        title:"",
        desc:"",
        imgUrl:"",
        videoUrl:"",
        tags:[""]
    })

    // const [thumbnailImg,setThumbnailImg]=useState<File | null>()
    // const [video,setVideo]=useState<File | null>(null)

    const handleSearch=()=>{
        navigate(`/search?search=${q}`)
    }
    
    // 193
    // const [cookies,removeCookie]=useCookies()
    // // console.log(Cookies.name())
    // console.log(cookies)

    const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(!e.target.files){
            console.error("input is null")
        }else{
            // const urlType="imgType"
            // uploadFile(e.target.files[0],urlType)
            const file=e.target.files[0]
            setUploading(true)
            const storage = getStorage();
            const filename= new Date().getTime()+file.name
            const storageRef = ref(storage, filename);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                    setImgPercent(progress)
                
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                        break;
                        case 'running':
                            console.log('Upload is running');
                        break;
                        default:
                            console.log(snapshot.state)
                        break;
                }
            }, 
            (error) => {
            // Handle unsuccessful uploads
                console.log(error)
            }, 
            () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                
                formData.imgUrl=downloadURL
                setUploading(false)
                console.log('File available at', downloadURL);
            });
        });
            
        }
    }
    
    const handleVideoChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(!e.target.files){
            console.error("input is null")
        }else{
            // const urlType="videoType"
            // uploadFile(e.target.files[0],urlType)
            const file=e.target.files[0]
            setUploading(true)
            const storage = getStorage();
            const filename= new Date().getTime()+file.name
            const storageRef = ref(storage, filename);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
            (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setVideoPercent(progress)
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                    break;
                    case 'running':
                        console.log('Upload is running');
                    break;
                    default:
                        console.log(snapshot.state)
                    break;
                }
            }, 
            (error) => {
            // Handle unsuccessful uploads
                console.log(error)
            }, 
            () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              
                formData.videoUrl=downloadURL
                setUploading(false)

                console.log('File available at', downloadURL);
            });
        });
        }
    }

    const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleTagsChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        formData.tags=e.target.value.split(",")
    }

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            const res= await axios.post(`${import.meta.env.VITE_API_URL}/videos`,formData,{withCredentials:true})
            navigate(`/video/${res.data._id}`)
            setShowCreateForm(false)
        } catch (error) {
            console.log(error)
            
        }
    }
    return(
        <>
            {isSearchHeader?
                <div className="Header">
                    <i onClick={()=>setSearchHeader(false)} className="ri-arrow-left-line"></i>
                    <div className="Header-search2-input">
                        <input 
                            type="text" 
                            name="q" 
                            onChange={(e)=>setQ(e.target.value)}
                            placeholder="Search"
                            value={q}
                        />
                        <div>
                            <i onClick={()=>handleSearch()} className="ri-search-line"></i>
                        </div>
                    </div>
                </div>
            :
                <div className="Header">
                    <div className="Header-logo">
                        <i onClick={()=>dispatch(openNavbar())} className="ri-menu-line"></i>
                        <Link to={"/"}>
                            <div>
                                <img src={mainLogo} alt="coltube" width={30}/>
                            </div>
                            <h1 >ColTube</h1>
                        </Link>
                    </div>
                    <div className="Header-search-input">
                        <input 
                            type="text" 
                            name="q" 
                            onChange={(e)=>setQ(e.target.value)}
                            placeholder="Search"
                            value={q}
                        />
                        <div>
                            <i onClick={()=>handleSearch()} className="ri-search-line"></i>
                        </div>
                    </div>
                    <div className="Header-add-video-profile">
                        <i onClick={()=>setSearchHeader(true)} className="ri-search-line"></i>
                        {user?
                            <>
                                <i onClick={()=>setShowCreateForm(true)} className="ri-video-add-line"></i>
                                <div>
                                    <img src={user?.img} alt="name" width={35}/>
                                </div>
                            </>
                        :
                            <div className="Header-signin-btn-container">
                                <Link to="/auth">
                                    <div className="Header-signin-btn">
                                        <i className="bi bi-person-circle"></i>
                                        <p>Sign in</p>
                                    </div>
                                </Link>
                            </div>
                        }
                    </div>
                        
                    {showCreateForm &&
                        <div className="Create-video-model">
                            <div className="form-container">
                                <h1>Create Video</h1>
                                <i onClick={()=>setShowCreateForm(false)} className="ri-close-fill"></i>
                                <form onSubmit={e=>handleSubmit(e)}>
                                    <div className="input-container">
                                        <label>Video:</label>
                                        {videoPercent>0 && formData.videoUrl.length==0?
                                            <progress id="file" value={videoPercent} className="input" max="100"> {videoPercent}% </progress>
                                        :
                                            formData.videoUrl.length>0?
                                                <div className="input uploaded-container">
                                                    <h3 >{"file uploaded"}</h3>
                                                    <i onClick={()=>{formData.videoUrl="";setVideoPercent(0)}} className="ri-close-fill"></i>
                                                    
                                                </div>
                                            :
                                                <input 
                                                    type="file" 
                                                    name="video" 
                                                    disabled={uploading}
                                                    onChange={(e)=>handleVideoChange(e)} 
                                                    className="input"
                                                    accept="video/*"
                                                />
                                        }
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Title" 
                                        className="input"
                                        name='title'
                                        onChange={e=>handleChange(e)}
                                        />
                                    <textarea  
                                        placeholder="Description" 
                                        className="input"
                                        name="desc"
                                        onChange={e=>handleChange(e)}
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Seperate the tag with comma" 
                                        className="input"
                                        onChange={e=>handleTagsChange(e)}
                                    />
                                    <div className="input-container">
                                        <label>Thumbnail:</label>
                                        {imgPercent>0 && formData.imgUrl.length==0?
                                            <progress id="file" value={imgPercent} className="input" max="100"> {imgPercent}% </progress>
                                        :
                                            formData.imgUrl.length>0?
                                                <div className="input uploaded-container">
                                                    <h3 >{"file uploaded"}</h3>
                                                    <i onClick={()=>{formData.imgUrl="";setImgPercent(0)}} className="ri-close-fill"></i>
                                                </div>
                                            :
                                                <input 
                                                    type="file" 
                                                    disabled={uploading}
                                                    className="input"
                                                    accept="image/*"
                                                    onChange={(e)=>handleImageChange(e)}
                                                />
                                        }
                                    </div>
                                    <button type="submit">Create Video</button>
                                </form>

                            </div>
                        </div>
                    }
                </div>
                
            }
        </>
    )
}

export default Header;