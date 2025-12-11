import { NextFunction,Request,Response } from "express";

function errorHandler(error:any,res:Response,req:Request,next:NextFunction){
    const errorStatus=error.statusCode || 500;
    const errorMsg=error.errorMsg || "Something went wrong";
    return res.status(errorStatus).json({
        message:errorMsg,
        status:errorStatus,
        success:false
    })
}


export default errorHandler;