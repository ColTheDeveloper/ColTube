import { createError } from "../middlewares/error.js"
import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const signup=async(req,res,next)=>{
    const {name, email , password}=req.body
    try {
        const foundUser= await userModel.findOne({email:req.body.email})
        if(foundUser) return next(createError(404, "User already existed!"))
        
        const salt=bcrypt.genSaltSync(10)
        const hashPassword=bcrypt.hashSync(password,salt)
        const newUser=new userModel({
            name,
            email,
            password:hashPassword
        })
        await newUser.save()

        const  token=jwt.sign({id:newUser._id},process.env.JWT_TOKEN)

        const {password,...others}=newUser._doc

        res.cookie("access_token",token,{
            httpOnly:false,
            sameSite:"None",
            secure:true,
        }).status(200).json(others)

    } catch (err) {
        next(err)
    }
}


export const signin=async(req,res,next)=>{
    try {
        const user= await userModel.findOne({email:req.body.email})
        if(!user) return next(createError(404,"User doesn't exist!"))

        if(user.fromGoogle) return next(createError(404,"signin with google instead!"))

        const isPassword= await bcrypt.compare(req.body.password,user.password)
        // console.log(req.body.password)
        // console.log(user.password)
        // console.log(isPassword)
        if(!isPassword) return next(createError(400,"Incorrect Password!"))

        const  token=jwt.sign({id:user._id},process.env.JWT_TOKEN)

        const {password,...others}=user._doc

        res.cookie("access_token",token,{
            httpOnly:false,
            sameSite:"None",
            secure:true,
        }).status(200).json(others)

    } catch (err) {
        next(err)
    }
}

export const signinWithGoogle= async(req,res,next)=>{
    try {
        const user= await userModel.findOne({name:req.body.name})
        
        if(user){
            const  token=jwt.sign({id:user._id},process.env.JWT_TOKEN)
            res.cookie("access_token",token,{
                httpOnly:false,
                sameSite:"None",
                secure:false
            }).status(200).json(user)
        }else{
            const newUser= await userModel({
                ...req.body,
                fromGoogle:true
            })
            const user= await newUser.save()
            const  token=jwt.sign({id:user._id},process.env.JWT_TOKEN)
            res.cookie("access_token",token,{
                httpOnly:false,
                sameSite:"None",
                secure:true,
            }).status(200).json(user)
        }
    } catch (err) {
        next(err)   
    }

}