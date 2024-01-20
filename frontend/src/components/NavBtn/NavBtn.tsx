import {  Link, NavLink } from "react-router-dom"
import "./NavBtn.css"


type NavBtnType={
    iconName:string
    navName:string
    link:string
    isNavLink:boolean
}
const NavBtn=({iconName,navName,link,isNavLink}:NavBtnType)=>{
    return(
        <>
            {isNavLink?
                <NavLink className="nav-btn" to={link}>
                    <i className={iconName}></i>
                    <span>{navName}</span>
                </NavLink>
                :
                <Link className="nav-btn" to={link}>
                    <i className={iconName}></i>
                    <span>{navName}</span>
                </Link>

            }
        </>
    )
}

export default NavBtn