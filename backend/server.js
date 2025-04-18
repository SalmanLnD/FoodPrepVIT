const express = require('express');
const cors = require('cors');
const connectDb = require('./config/dbConn')
const foodRoute = require('./routes/foodRoute')
const cartRouter = require('./routes/cartRoute')
const userRouter = require('./routes/userRoute')
const orderRouter = require('./routes/orderRoute')

//app config
const app = express();
const PORT = process.env.PORT || 4000;
require('dotenv').config();

//middlewares
app.use(express.json());
app.use(cors());

connectDb()
//routes
app.use('/api/food', foodRoute)
app.use("/image",express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})