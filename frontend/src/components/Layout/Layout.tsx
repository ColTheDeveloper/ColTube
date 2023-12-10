import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import Nav from "../Nav/Nav"
import "./Layout.css"
const Layout=()=>{
    return(
        <div className="Layout">
            <Header />
            <div>
                
                    <Nav />
                    <Outlet />
                
            </div>
        </div>
    )
}
export default Layout