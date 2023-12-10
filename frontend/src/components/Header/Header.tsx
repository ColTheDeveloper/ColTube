import { useState } from "react";
import mainLogo from "../../assets/youtube-logo.png"
//import profilePics from "../../assets/profile.jpg"
import "./Header.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Header=()=>{
    const [q, setQ]=useState("")
    const [isSearchHeader,setSearchHeader]=useState(false)
    const [showCreateForm,setShowCreateForm]=useState(false)
    const {user}=useSelector((state:RootState)=>state.user)

    const [thumbnailImg,setThumbnailImg]=useState()
    const [video,setVideo]=useState()
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
                            <i className="ri-search-line"></i>
                        </div>
                    </div>
                </div>
            :
                <div className="Header">
                    <div className="Header-logo">
                        <i className="ri-menu-line"></i>
                        <div>
                            <img src={mainLogo} alt="coltube" width={30}/>
                        </div>
                        <h1 >ColTube</h1>
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
                            <i className="ri-search-line"></i>
                        </div>
                    </div>
                    <div className="Header-add-video-profile">
                        <i onClick={()=>setSearchHeader(true)} className="ri-search-line"></i>
                        {user?
                            <>
                                <i onClick={()=>setShowCreateForm(true)} className="ri-video-add-line"></i>
                                <div>
                                    <img src={user.img} alt="name" width={35}/>
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
                                <form>
                                    <div className="input-container">
                                        <label>Video:</label>
                                        <input type="file" name="video" className="input"/>
                                    </div>
                                    <input type="text" placeholder="Title" className="input"/>
                                    <textarea  placeholder="Description" className="input"/>
                                    <input type="text" placeholder="Seperate the tag with comma" className="input"/>
                                    <div className="input-container">
                                        <label>Thumbnail:</label>
                                        <input type="file" className="input"/>
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