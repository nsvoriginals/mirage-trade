import {Request,Response} from 'express'
import { getOrderById, placeOrder } from '../services/order.service';



export  async function  placeOrderController(req:Request ,res:Response) {
    try{
        const userId=req.user.id;
        const {order ,trade } = await placeOrder(userId,req.body);
        res.status(201).json({
            message:"successful",
            success:true,
            order
        });
    }catch(e){
        res.status(500).json({
            message:"Internal server issue" +e
        })
    }
}


export  async function  getOrderDetailsController(req:Request ,res:Response) {
    try{
       const order = await getOrderById(req.params.id);
        res.status(201).json({
            message:"successful",
            success:true,
            order
        });
    }catch(e){
        res.status(500).json({
            message:"Internal server issue" + e
        })
    }
}


