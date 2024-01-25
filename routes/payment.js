const express= require('express')
const router=express.Router()
const pay = require('../controller/purchase')
const userauthentiacte = require('../middleware/auth')
router.get('/premiumpay',userauthentiacte.authenticate,pay.purchasepremium)
router.post('/updatetransaction',userauthentiacte.authenticate,pay.updatetransaction)
module.exports=router