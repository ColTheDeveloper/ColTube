import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import Nav from "../Nav/Nav"
import "./Layout.css"
import { useCookies } from "react-cookie"
const Layout=()=>{
    // const [cookies,removeCookie]=useCookies(["access_token"])
    // removeCookie("access_token")
    return(
        <div className="Layout">
            <div>
            <Header />
            </div>
            <div>
                <Nav />
                <Outlet />
            </div>
        </div>
    )
}
export default Layout