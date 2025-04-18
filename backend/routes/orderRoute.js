const express = require('express')
const {placeOrder,verifyOrder,userOrders,listOrder,updateStatus} = require('../controllers/orderController')
const authMiddleware = require('../middleware/auth')
const orderRouter = express.Router()

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.get("/userorder",authMiddleware,userOrders)
orderRouter.get("/list",listOrder)
orderRouter.post("/status",updateStatus)

module.exports = orderRouter