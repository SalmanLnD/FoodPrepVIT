import {useContext,useEffect} from 'react'
import {StoreContext} from '../../context/StoreContext'
import {useSearchParams,useNavigate} from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import './Verify.css'
import axios from 'axios'

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    const {url} = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyPayment = async()=>{
        try {
            const response = await axios.post(url+"/api/order/verify",{success,orderId})
            navigate("/myorders")
        } catch (error) {
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment()
    },[])

  return (
    <Loader/>
  )
}

export default Verify