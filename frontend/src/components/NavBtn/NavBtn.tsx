import {  NavLink } from "react-router-dom"
import "./NavBtn.css"


type NavBtnType={
    iconName:string
    navName:string
    link:string
}
const NavBtn=({iconName,navName,link}:NavBtnType)=>{
    return(
        <NavLink className="nav-btn" to={link}>
            <i className={iconName}></i>
            <span>{navName}</span>
        </NavLink>
    )
}

export default NavBtn