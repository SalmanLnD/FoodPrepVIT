import {useState,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {assets} from '../../assets/assets'
import {StoreContext} from '../../context/StoreContext'

import './Navbar.css'

const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("home")
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
  const navigate = useNavigate(); 
  const logout = () => {
    localStorage.removeItem('token');
    setToken("")
    navigate("/")
  }

  return (
    <div className='navbar'>
        <Link to='/' > <img className='logo' src={assets.logo} alt="" /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
            <a href="#explore-menu"><li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li></a>
            <a href="#footer"><li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</li></a>
        </ul>
        <div className="navbar-right">
            <div className="basket-dot">
                <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token
              ?<button onClick={()=>setShowLogin(true)}>Sign Up</button>
              : <div className="navbar-profile">
                <img src={assets.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                <Link to="/myorders" ><li><img src={assets.bag_icon} alt=""/><p>Orders</p></li></Link>
                  <hr />
                  <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
              </div>
            }
            
        </div>
    </div>
  )
}

export default Navbar