import {useState} from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './screens/Home/Home'
import Cart from './screens/Cart/Cart'
import Verify from './screens/Verify/Verify'
import PlaceOrder from './screens/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import MyOrders from './screens/MyOrders/MyOrders'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import {ToastContainer} from'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <ToastContainer/>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin}/>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/order" element={<PlaceOrder/>}></Route>
          <Route path="/verify" element={<Verify/>}></Route>
          <Route path="/myorders" element={<MyOrders/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </>
    

  )
}

export default App