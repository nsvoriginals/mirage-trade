import { Request,Response } from "express";
import { getHoldings, getPortfolio } from "../services/portfolio.service";



export async function portfolioController(req:  Request & { user?: any } ,res:Response){
    const userId=req.user.id;

    try{
        const portfolioDetails=await getPortfolio(userId);
        if(!portfolioDetails){
            return res.status(400).json({
                message:"Portfolio Details not found"
            });
        }
        return res.status(200).json({
            message:"Portfolio detailes fetched successfully",
            portfolioDetails,
            id:portfolioDetails.id
        })
        
    }catch(e){ 
          res.status(500).json({
            message:"Internal Server Error"
          })
    }
}

export async function holdingController(req: Request & { user?: any },res:Response){
     const userId=req.user.id;

    try{
         const portfolioDetails=await getPortfolio(userId);
        if(!portfolioDetails){
            return res.status(400).json({
                message:"Portfolio Details not found"
            });
        }
        const holdingDetails=await getHoldings(portfolioDetails.id);
        if(!holdingDetails){
            return res.status(400).json({
                message:"Portfolio Details not found"
            });
        }
        return res.status(200).json({
            message:"Portfolio detailes fetched successfully",
            holdingDetails,
        })
        
    }catch(e){ 
          res.status(500).json({
            message:"Internal Server Error"
          })
    }
}

