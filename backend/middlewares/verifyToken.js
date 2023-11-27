import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken=async(req,res,next)=>{
    const token=req.cookies.access_token
    if(!token) return next( createError(401,"You are not authenticated!"))

    jwt.verify(token,process.env.JWT_TOKEN, (err,decoded)=>{
        if(err) return next( createError(403,"You are not authenticated!"))
        req.user= decoded
        next();
    })
}