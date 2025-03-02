import {useContext} from 'react'
import './FoodList.css'
import {StoreContext} from '../../context/StoreContext'
import FoodItemCard from '../FoodItemCard/FoodItemCard'

const FoodList = () => {

    const {food_list} = useContext(StoreContext)

  return (
    <div className='foodlist'>
        <h2>Top dishes near you</h2>
        <div className="food-diplay-list">
            {
                food_list.map((item,index)=>{
                    return <FoodItemCard id={item._id} name={item.name} price={item.price} description={item.description} image ={item.image}/>
                })
            }
        </div>
    </div>
  )
}

export default FoodList