const Razorpay =require('razorpay')
const Order = require('../models/order')
const purchasepremium = async(req,res,next) =>{
    try{
        let rzp=new Razorpay({
            key_id:'rzp_test_O9Gf8C2LKjccsw',
            key_secret:'VKKGmeaWbvno7DnfG6LIt2Em'
     })
     const amount=2500
     rzp.orders.create({amount,currency:'INR'},(err,order)=>{
        if(err){
            throw new Error('Something Went Wrong')
        }
        req.user.createOrder({orderid:order.id,status:"PENDING"}).then(()=>{
            return res.status(201).json({order,key_id:rzp.key_id})
    }).catch(err=>{
        throw new Error(err)
    })
     })
    }
    catch(err){
        console.log(err)
    }
}
const updatetransaction = async(req,res,next)=>{
    try{
        const {payment_id,order_id}=req.body
        console.log('req body is',req.body)
        const order=await Order.findOne({where:{orderid:order_id}})
        const Promise1 = order.update({paymentid:payment_id,status:'SUCCESSFUL'})
        const Promise2 = req.user.update({ispremium:true})
        Promise.all([Promise1,Promise2])
        .then(()=>{
            return res.status(202).json({success:'true',message:'Transaction Successful'})
        })
        .catch((err)=>{
            throw new Error(err)
        })
    }
    catch(err){
        console.log(err)
    }
}
module.exports={
    purchasepremium,
    updatetransaction
}
