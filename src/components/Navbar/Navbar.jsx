import React from 'react'
import {assets} from '../../assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <ul className="navbar-menu">
            <li>Home</li>
            <li>Menu</li>
            <li>Contact us</li>
        </ul>
        <div className="navbar-right">
            <div className="basket-dot">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>
            </div>
            <button>Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar