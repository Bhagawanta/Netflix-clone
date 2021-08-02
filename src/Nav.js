import React, { useEffect, useState } from 'react'
import Netflix from './Assets/netflix.png'
import './Nav.css'
const Nav = () => {

    const [show , handleShow ] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY >100){
            handleShow(true);
            }
            else handleShow(false);
        });
        return () => { window.removeEventListener("scroll",()=>{})};
    },[])

    return (
        <div className={`nav ${show && "nav_black"}`}>

            <img
                className="nav_logo"
                src={Netflix} 
                alt="Netflix_logo"
            />
            <img
                className="nav_avatar"
                src = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt = "Netflix Logo"
            />
            
        </div>
    )
}
export default Nav;