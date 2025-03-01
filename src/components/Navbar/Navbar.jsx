import {useState} from 'react'
import {assets} from '../../assets/assets'
import './Navbar.css'

const Navbar = () => {
  const [menu,setMenu] = useState("home")
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <ul className="navbar-menu">
            <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</li>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li>
            <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</li>
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