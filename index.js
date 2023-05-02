const express=require('express')
const dotenv=require('dotenv').config()
const Razorpay=require('razorpay')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
app.post('/payment',async(req,res)=>{
    try {
    let {amount}=req.body
    var instance = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret })
    let order=await instance.orders.create({
  amount: amount*100,
  currency: "INR",
  receipt: "receipt#1",
})
console.log(order)
res.status(201).json({order})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
})
app.listen(5000,()=>{
    console.log('Server listening on 80')
})