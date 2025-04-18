const orderModel = require('../models/orderModel')
const userModel = require('../models/userModel')
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req,res)=>{
    const frontend_url = 'http://localhost:5174'
    try {
        const newOrder = await orderModel.create({
            userId:req.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await userModel.findByIdAndUpdate(req.userId,{cartData:{}})

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:'inr',
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:'inr',
                product_data:{
                    name:'Delivery Charge'
                },
                unit_amount:20*100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode:'payment',
            success_url : `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.status(200).json({session_url:session.url})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

const verifyOrder = async(req,res)=>{
    const {orderId,success} = req.body
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.status(200).json({message:"Payment Successful"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.status(204).json({message:"Payment Failed"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.userId})
        res.status(200).json({data:orders})
    } catch (error) {
        console.log(error)
        res.json(500).json({message:"Internal Server Error"})
    }
}

const listOrder = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({data:orders})
    } catch (error) {
        console.log(error)
        res.json(500).json({message:"Internal Server Error"})
    }
}

const updateStatus = async(req,res)=>{
    try {
      const order = await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
      res.json({message:"Status updated"})
    } catch (error) {
      console.log(error)
      res.json(500).json({message:"Internal Server Error"})
    }
  }

module.exports = {placeOrder,verifyOrder,userOrders,listOrder,updateStatus}