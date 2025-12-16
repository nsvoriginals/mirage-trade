import { login,register,me } from "../services/auth.service";
import { Request,Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { createPortfolio } from "../services/portfolio.service";
dotenv.config()
const secret=process.env.JWT_SECRET || "testsecret"


interface LoginRequest{
    email:string,
    password:string
}



interface RegisterRequest{
    email:string,
    username:string,
    password:string
}


interface Me{
    email:string
}



export async function loginController(req:Request<{},{},LoginRequest>,res:Response){
    const { email,password}=req.body;
    const user = await login(email,password);
    if(!user){
       return res.status(400).json({
            message:"User not found"
        })
    }
    const token=await jwt.sign({user},secret,{expiresIn:'1 d'})
    console.log(secret)
    return res.status(200).json({
        message:"Login Successful",
        user,
        token
    })
}

export async function registerController(req:Request<{},{},RegisterRequest>,res:Response){
    const { email,username,password}=req.body;
    const user = await register(email,username,password);
    if(!user){
       return res.status(400).json({
            message:"User already exists"
        })
    }
    await createPortfolio(user.newUser.id)
    return res.status(200).json({
        message:"Registration Successful",
        user:user.newUser
    })
}


export async function meController(req:Request<{},{},Me>,res:Response) {
     const user = await me(req.body.email);
     return res.status(200).json(user)
}