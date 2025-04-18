import {createContext,useState,useEffect} from 'react'
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContexProvider = (props)=>{
    const [cartItems,setCartItems] = useState({})
    const [token,setToken] = useState("")
    const [food_list,setFoodList] = useState([])

    
    const url = "http://localhost:4000"

    const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }


    const addToCart = async(itemId)=>{
        if(!cartItems[itemId]) setCartItems({...cartItems,[itemId]:1})
        else setCartItems({...cartItems,[itemId]:cartItems[itemId]+1})
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async(itemId)=>{
        setCartItems({...cartItems,[itemId]:cartItems[itemId]-1})
        if(token){
            await axios.delete(url+"/api/cart/remove?itemId="+itemId,{headers:{token}})
        }
    }

    const loadCartData = async (token)=>{
        const response = await axios.get(url+"/api/cart/get",{headers:{token}})
        setCartItems(response.data.cartData)
    }

    const getTotalCartAmount=()=>{
        let total=0;
        for(let item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find(food=>food._id===item)
                total+=itemInfo.price*cartItems[item];
            }
        }
        return total;
    }

    const contextValue={
        getTotalCartAmount,
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        url,
        token,
        setToken
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList()
            const token = localStorage.getItem("token")
            if(token){
                setToken(token)
                await loadCartData(token)
            }
        }
        loadData()
    },[])

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContexProvider;