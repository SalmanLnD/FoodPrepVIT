import {useContext,useState,useEffect} from 'react'
import './PlaceOrder.css'
import {StoreContext} from '../../context/StoreContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const PlaceOrder = () => {
  const {getTotalCartAmount,food_list,cartItems,url,token} = useContext(StoreContext);
  const navigate = useNavigate()
  const [data,setData] = useState({
    first_name:"",
    last_name:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zip_code:"",
    country:"",
    phone:""
  })

  const onChangeHandler=(e)=>{
    const {name,value} = e.target
    setData({...data,[name]:value})
  }

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    let orderItems = []
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item
        itemInfo.quantity = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items:orderItems,
      amount:getTotalCartAmount()+20
    }

    try {
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      const {session_url} = response.data
      window.location.replace(session_url)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(!token)
      navigate("/cart")
    else if(getTotalCartAmount()==0)
      navigate("/cart")
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className="place-order">
      <div className="place-order-left">
          <h2 className='title'>Delivery Information</h2>
          <div className="multi-fields">
            <input required onChange={onChangeHandler} name='first_name' value={data.first_name} type="text" placeholder='First Name'/>
            <input required onChange={onChangeHandler} name='last_name' value={data.last_name} type="text" placeholder='Last Name'/>
          </div>
          <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email Address'/>
          <input required onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street'/>
          <div className="multi-fields">
            <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City'/>
            <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State'/>
          </div><div className="multi-fields">
            <input required onChange={onChangeHandler} name='zip_code' value={data.zip_code} type="text" placeholder='Zip Code'/>
            <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country'/>
          </div>
          <input required onChange={onChangeHandler} name='phone' value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()!==0?20:0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()+20}</b>
            </div>
          </div>
          <button type='submit' > Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder