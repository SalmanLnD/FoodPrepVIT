import {useEffect,useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {assets} from '../../assets/assets'
import './Orders.css'

const Orders = ({url}) => {

  const [orders,setOrders] = useState([])

  const fetchAllOrders = async()=>{
    try {
      const response = await axios.get(url+"/api/order/list")
      setOrders(response.data.data)
    } catch (error) {
      toast.error(error)
    }
  }

  const statusHandler = async(e,orderId)=>{
    try {
      const response  = await axios.post(url+"/api/order/status",{
        orderId,
        status:e.target.value
      })
      await fetchAllOrders()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])

  return (
      <div className="order screen">
        <h3>Order Page</h3>
        <div className="order-list">
          {orders.map((order,index)=>(
            <div className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item,itemIndex)=>{
                    if(itemIndex!==order.items.length-1)
                      return item.name+" x "+item.quantity+", "
                    return item.name+" x "+item.quantity
                  })}
                </p>
                <p className="order-item-name">{order.address.first_name+" "+order.address.last_name}</p>
                <div className="order-item-address">
                  <p >{order.address.street+", "}</p>
                  <p>{order.address.city+", "+order.address.state+", "+ order.address.country+", "+order.address.zip_code}</p>
                </div>
                <p className='phone'>{order.address.phone}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>₹{order.amount}</p>
                <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Orders