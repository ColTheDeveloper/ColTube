import "./Nav.css"
import mainLogo from "../../assets/youtube-logo.png"
import NavBtn from "../NavBtn/NavBtn"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { closeNavbar } from "../../redux/navbarSlide"
import { RootState } from "../../redux/store"
import { logout } from "../../redux/userSlice"

const Nav=()=>{
    const dispatch=useDispatch()
    const {isNavbarOpen}=useSelector((state:RootState)=>state.navbar)
    const {user}=useSelector((state:RootState)=>state.user)
    
    const logOut=()=>{
        dispatch(logout())
    }
    return(
        <div style={{left:isNavbarOpen?"0px":"-800px"}} className="Nav">
            <div className="Header-logo">
                <i onClick={()=>dispatch(closeNavbar())}  className="ri-menu-line"></i>
                <Link to="/">
                    <div>
                        <img src={mainLogo} alt="coltube" width={30}/>
                    </div>
                    <h1 >ColTube</h1>
                </Link>
            </div>
            <div className="nav-container">
                <NavBtn iconName="ri-home-2-fill" navName="Home" isNavLink={true} link="/" />
                <NavBtn iconName="ri-compass-line" navName="Explore" isNavLink={true} link="/explore" />
                <NavBtn iconName="bi bi-collection-play" navName="Subscriptions" isNavLink={true} link="/sub" />
                
                {/* <hr />

                <NavBtn iconName="ri-home-2-fill" navName="Library" link="/library" />
                <NavBtn iconName="ri-history-line" navName="History" link="/history" /> */}

                <hr />
                <h3>Explore</h3>
                <NavBtn iconName="ri-fire-line" navName="Trending" isNavLink={false} link="/trend" />
                <NavBtn iconName="ri-code-line" navName="Coding" isNavLink={false} link="/tags?tag=coding" />
                <NavBtn iconName="ri-music-2-line" navName="Music" isNavLink={false} link="/tags?tag=music" />
                <NavBtn iconName="ri-trophy-line" navName="Sport" isNavLink={false} link="/tags?tag=sport" />
                <NavBtn iconName="ri-gamepad-line" navName="Gaming" isNavLink={false} link="/tags?tag=gaming" />
                <NavBtn iconName="bi bi-film" navName="Anime" isNavLink={false} link="/tags?tag=anime" />
                

                <hr />
                <h3>More from ColTube</h3>
                <div className="nav-dummy-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" >
                        <defs>
                            <radialGradient cx="5.4%" cy="7.11%" r="107.93%" fx="5.4%" fy="7.11%" gradientTransform="matrix(.70653 0 0 1 .016 0)">
                            <stop offset="0%" stop-color="#FFF"></stop>
                            <stop offset="100%" stop-color="#FFF" stop-opacity="0"></stop>
                            </radialGradient>
                        </defs>
                        <g fill="none" fill-rule="evenodd">
                            <path d="M1 1h21.77v22H1z"></path>
                            <g fill-rule="nonzero">
                            <path fill="#F00" d="M22.54 7.6s-.2-1.5-.86-2.17c-.83-.87-1.75-.88-2.18-.93-3.04-.22-7.6-.2-7.6-.2s-4.56-.02-7.6.2c-.43.05-1.35.06-2.18.93-.65.67-.86 2.18-.86 2.18S1.04 9.4 1 11.18v1.66c.04 1.78.26 3.55.26 3.55s.2 1.5.86 2.18c.83.87 1.9.84 2.4.94 1.7.15 7.2.2 7.38.2 0 0 4.57 0 7.6-.22.43-.05 1.35-.06 2.18-.93.65-.67.86-2.18.86-2.18s.22-1.77.24-3.55v-1.66c-.02-1.78-.24-3.55-.24-3.55z"></path>
                            <path fill="#FAFAFA" d="M9.68 8.9v6.18l5.84-3.1"></path>
                            <path fill="#000" fill-opacity=".12" d="M9.68 8.88l5.13 3.48.73-.38"></path>
                            <path fill="#FFF" fill-opacity=".2" d="M22.54 7.6s-.2-1.5-.86-2.17c-.83-.87-1.75-.88-2.18-.93-3.04-.22-7.6-.2-7.6-.2s-4.56-.02-7.6.2c-.43.05-1.35.06-2.18.93-.65.67-.86 2.18-.86 2.18S1.04 9.4 1 11.18v.1c.04-1.76.26-3.54.26-3.54s.2-1.5.86-2.17c.83-.88 1.75-.88 2.18-.93 3.04-.22 7.6-.2 7.6-.2s4.56-.02 7.6.2c.43.05 1.35.05 2.18.93.65.66.86 2.17.86 2.17s.22 1.78.23 3.55v-.1c0-1.8-.23-3.56-.23-3.56z"></path>
                            <path fill="#3E2723" fill-opacity=".2" d="M22.54 16.4s-.2 1.5-.86 2.17c-.83.87-1.75.88-2.18.93-3.04.22-7.6.2-7.6.2s-4.56.02-7.6-.2c-.43-.05-1.35-.06-2.18-.93-.65-.67-.86-2.18-.86-2.18s-.22-1.8-.26-3.57v-.1c.04 1.76.26 3.54.26 3.54s.2 1.5.86 2.17c.83.88 1.75.88 2.18.93 3.04.22 7.6.2 7.6.2s4.56.02 7.6-.2c.43-.05 1.35-.05 2.18-.93.65-.66.86-2.17.86-2.17s.22-1.78.23-3.55v.1c0 1.8-.23 3.56-.23 3.56z"></path>
                            <path fill="#FFF" fill-opacity=".2" d="M9.68 15.08v.1l5.84-3.08v-.12"></path>
                            <path fill="#3E2723" fill-opacity=".2" d="M9.68 8.9v-.13l5.84 3.1v.1"></path>
                            <path fill="url(#youtube_round__a)" fill-opacity=".1" d="M21.54 3.4s-.2-1.5-.86-2.18C19.85.35 18.93.35 18.5.3 15.46.07 10.9.1 10.9.1S6.34.07 3.3.3c-.43.05-1.35.05-2.18.92C.47 1.9.26 3.4.26 3.4S.04 5.17 0 6.95V8.6c.04 1.8.26 3.56.26 3.56s.2 1.52.86 2.18c.83.87 1.9.85 2.4.94 1.7.16 7.2.2 7.38.2 0 0 4.57 0 7.6-.2.43-.06 1.35-.07 2.18-.94.65-.66.86-2.18.86-2.18s.22-1.77.24-3.55V6.97c-.02-1.78-.24-3.55-.24-3.55z" transform="translate(1 4.208)"></path>
                            </g>
                        </g>
                    </svg>
                    <span>ColTube Premium</span>
                </div>
                <div className="nav-dummy-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" >
                        <path fill="red" d="M11.13 1.21c.48-.28 1.26-.28 1.74 0l8.01 4.64c.48.28.87.97.87 1.53v9.24c0 .56-.39 1.25-.87 1.53l-8.01 4.64c-.48.28-1.26.28-1.74 0l-8.01-4.64c-.48-.28-.87-.97-.87-1.53V7.38c0-.56.39-1.25.87-1.53l8.01-4.64z"></path>
                        <path fill="#fff" d="m12.71 18.98 4.9-2.83c.41-.24.64-.77.64-1.24V9.24c0-.47-.23-1-.64-1.24l-4.9-2.82c-.41-.23-1.02-.23-1.42 0L6.39 8c-.4.23-.64.77-.64 1.24v5.67c0 .47.24 1 .64 1.24l4.9 2.83c.2.12.46.18.71.18.26-.01.51-.07.71-.18z"></path>
                        <path fill="red" d="m12.32 5.73 4.89 2.83c.16.09.41.31.41.67v5.67c0 .37-.25.54-.41.64l-4.89 2.83c-.16.09-.48.09-.64 0l-4.89-2.83c-.16-.09-.41-.34-.41-.64V9.24c.02-.37.25-.58.41-.68l4.89-2.83c.08-.05.2-.07.32-.07s.24.02.32.07z"></path>
                        <path fill="#fff" d="M9.88 15.25 15.5 12 9.88 8.75z"></path>
                    </svg>
                    <span>ColTube Studio</span>
                </div>
                <div className="nav-dummy-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" >
                        <circle fill="#FF0000" cx="12" cy="12" r="10"></circle>
                        <polygon fill="#FFFFFF" points="10,14.65 10,9.35 15,12 "></polygon>
                        <path fill="#FFFFFF" d="M12,7c2.76,0,5,2.24,5,5s-2.24,5-5,5s-5-2.24-5-5S9.24,7,12,7 M12,6c-3.31,0-6,2.69-6,6s2.69,6,6,6s6-2.69,6-6 S15.31,6,12,6L12,6z"></path>
                    </svg>
                    <span>ColTube Music</span>
                </div>
                <div className="nav-dummy-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" >
                        <path fill="#FF0000" d="M21.39,13.19c0-0.08,0-0.15,0-0.22c-0.01-0.86-0.5-5-0.78-5.74c-0.32-0.85-0.76-1.5-1.31-1.91 c-0.9-0.67-1.66-0.82-2.6-0.84l-0.02,0c-0.4,0-3.01,0.32-5.2,0.62C9.28,5.4,6.53,5.8,5.88,6.04c-0.9,0.33-1.62,0.77-2.19,1.33 c-1.05,1.04-1.18,2.11-1.04,3.51c0.1,1.09,0.69,5.37,1.02,6.35c0.45,1.32,1.33,2.12,2.47,2.24c0.28,0.03,0.55,0.05,0.82,0.05 c1,0,1.8-0.21,2.72-0.46c1.45-0.39,3.25-0.87,6.97-0.87l0.09,0h0.02c0.91,0,3.14-0.2,4.16-2.07C21.44,15.12,21.41,13.91,21.39,13.19 z"></path>
                        <path fill="#000" d="M21.99,13.26c0-0.08,0-0.16-0.01-0.24c-0.01-0.92-0.54-5.32-0.83-6.11c-0.34-0.91-0.81-1.59-1.4-2.03 C18.81,4.17,17.99,4.02,17,4l-0.02,0c-0.43,0-3.21,0.34-5.54,0.66c-2.33,0.32-5.25,0.75-5.95,1C4.53,6.01,3.76,6.48,3.16,7.08 c-1.12,1.1-1.25,2.25-1.11,3.74c0.11,1.16,0.73,5.71,1.08,6.75c0.48,1.41,1.41,2.25,2.63,2.38C6.06,19.98,6.34,20,6.63,20 c1.07,0,1.91-0.23,2.89-0.49c1.54-0.41,3.46-0.93,7.41-0.93l0.1,0h0.02c0.97,0,3.34-0.21,4.42-2.2 C22.04,15.32,22.01,14.03,21.99,13.26z M20.59,15.91c-0.82,1.51-2.75,1.68-3.56,1.68l-0.1,0c-4.09,0-6.07,0.53-7.67,0.96 C8.31,18.8,7.56,19,6.63,19c-0.25,0-0.5-0.01-0.76-0.04c-1.04-0.11-1.54-0.99-1.79-1.71c-0.3-0.88-0.91-5.21-1.04-6.53 C2.9,9.25,3.1,8.54,3.86,7.79c0.5-0.5,1.15-0.89,1.97-1.19c0.17-0.06,1.1-0.32,5.74-0.95C14.2,5.29,16.64,5.01,16.99,5 c0.83,0.02,1.43,0.13,2.17,0.69c0.43,0.32,0.79,0.86,1.06,1.58c0.22,0.58,0.76,4.78,0.77,5.77l0.01,0.25 C21.01,13.96,21.04,15.08,20.59,15.91z"></path>
                        <path fill="#000" d="M11.59,14.76c-0.48,0.36-0.8,0.45-1.01,0.45c-0.16,0-0.25-0.05-0.3-0.08c-0.34-0.18-0.42-0.61-0.5-1.2l-0.01-0.1 c-0.04-0.31-0.26-2.1-0.38-3.16L9.3,9.94C9.26,9.66,9.2,9.19,9.54,8.94c0.32-0.23,0.75-0.09,0.96-0.03c0.53,0.17,3.6,1.23,4.59,1.73 c0.21,0.09,0.67,0.28,0.68,0.83c0.01,0.5-0.38,0.74-0.53,0.82L11.59,14.76z"></path>
                        <path fill="#FFF" d="M10.3,9.89c0,0,0.5,4.08,0.51,4.19c0.06-0.04,3.79-2.58,3.79-2.58C13.71,11.07,11.07,10.14,10.3,9.89z"></path>
                    </svg>
                    <span>ColTube Kids</span>
                </div>
                {user&&
                    <>
                        <hr />
                        <div onClick={()=>{logOut()}} className="nav-dummy-btn">
                            <i className="ri-logout-circle-line"></i>
                            <span>LogOut</span>
                        </div>
                    </>
                }
            </div>

        </div>
    )
}
export default Nav