import React from 'react'
import {assets} from '../../assets/assets'
import './FoodItemCard.css'

const FoodItemCard = ({id,name,price,description,image}) => {
  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img className='food-item-img' src={image} alt="" />
        </div>
        <p className='food-item-name'>{name}</p>
        <p className='food-item-desc'>{description}</p>
        <div className="price-rating">
            <p className='food-item-price'>₹{price}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
    </div>
  )
}

export default FoodItemCard