import express from 'express'
import {placeOrderController,getOrderDetailsController} from '../controllers/order.controller'
import authMiddleware from '../middlewares/auth.middleware'


const router = express.Router()

router.post('/placeorder',authMiddleware,placeOrderController)
router.get('/orderdetils/:id',authMiddleware,getOrderDetailsController)

export default router;