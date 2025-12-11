import jwt from 'jsonwebtoken';
import { NextFunction, Request,Response } from 'express';
const secret=process.env.JWT_SECRET || "testsecret"


export default async function authMiddleware(req:Request & { user?: Object },res:Response,next:NextFunction){
   try{
    const authheaders=req.headers.authorization;
    if(!authheaders || !authheaders.startsWith("Bearer")){
        return res.json({
            message:"Invalid Headers"
        })
    }
    const token=authheaders.split(" ")[1]
    const decoded= await jwt.verify(token,secret) as { user :any}
   // console.log(decoded)
    req.user =decoded.user.user;
    next();

   }catch(e){
    return res.json({
        message:"Exception occured"+e
    })
   }
}

