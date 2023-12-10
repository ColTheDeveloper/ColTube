import "./Nav.css"
import mainLogo from "../../assets/youtube-logo.png"
import NavBtn from "../NavBtn/NavBtn"

const Nav=()=>{
    return(
        <div className="Nav">
            <div className="Header-logo">
                <i className="ri-menu-line"></i>
                <div>
                    <img src={mainLogo} alt="coltube" width={30}/>
                </div>
                <h1 >ColTube</h1>
            </div>
            <div className="nav-container">
                <NavBtn iconName="ri-home-2-fill" navName="Home" link="/" />
                <NavBtn iconName="ri-compass-line" navName="Explore" link="/explore" />
                <NavBtn iconName="bi bi-collection-play" navName="Subscriptions" link="/subscriptions" />
                
                <hr />

                <NavBtn iconName="ri-home-2-fill" navName="Library" link="/library" />
                <NavBtn iconName="ri-history-line" navName="History" link="/history" />
            </div>

        </div>
    )
}
export default Nav