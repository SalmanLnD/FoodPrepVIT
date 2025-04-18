import {useState,useContext,useEffect} from 'react'
import Loader from '../../components/Loader/Loader'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
import {assets} from '../../assets/assets'
import './MyOrders.css'

const MyOrders = () => {

    const [data,setData] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const {url,token,setToken} = useContext(StoreContext)

    const fetchOrders = async()=>{
        try {
            const response = await axios.get(url+"/api/order/userorder",{headers:{token}})
            setData(response.data.data)
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }
    console.log(data)
    useEffect(()=>{
        if(token)
            fetchOrders()
    },[token])

    if(isLoading)
        return <Loader/>

  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
        {data.length>0
            ?(
                data.map((order,index)=>{
                    return(
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>
                                {order.items.map((item,itemIndex)=>{
                                    if(index==order.items.length-1)
                                        return item.name +" x "+ item.quantity+ " "
                                    return item.name +" x "+ item.quantity+ ", "
                                })}
                            </p>
                            <p>₹{order.amount}</p>
                            <p>Items:{order.items.length}</p>
                            <p><span>&#x25cf; </span><b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )
                })
            )
            :<p>No Orders Found</p>
        }
        </div>
    </div>
  )
}

export default MyOrders