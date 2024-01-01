import { createError } from "../middlewares/error.js"
import userModel from "../models/userModel.js"
import videoModel from "../models/videoModel.js"

export const getUser=async(req,res,next)=>{
    try {
        const user= await userModel.findById(req.params.id)
        const {password, ...others}=user._doc

        res.status(200).json(others)
        
    } catch (err) {
        next(err)
        
    }
}

export const deleteUser=async(req,res,next)=>{
    if(req.params.id===req.user.id){
        try {
            await userModel.findByIdAndDelete(req.params.id)

            res.status(200).json("User has been deleted successfully")
            
        } catch (err) {
            next(err)            
        }
    }else{
        return next(createError(403,"You can only delete your account"))
    }
}

export const updateUser=async(req,res,next)=>{
    
    if(req.params.id==req.user.id){
        try {
            const updatedUser=await userModel.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})

            const {password,...others}=updatedUser._doc
            res.status(200).json(others)
            
        } catch (err) {
            next(err)
        }

    }else{
        return next(createError(403,"You can only update your account"))
    }
}

export const subscribe=async(req,res,next)=>{
    try {
        await userModel.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id},
        })

        await userModel.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1}
        })

        res.status(200).json("Subscription successful")
    } catch (err) {
        next(err)
        
    }
}

export const unsubscribe=async(req,res,next)=>{
    try {
        await userModel.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers:req.params.id}
        })

        await userModel.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1}
        })

        res.status(200).json("Unsubscription successful")
        
    } catch (err) {
        next(err)
    }
}


export const likeVideo=async(req,res,next)=>{
    const userId=req.user.id
    const videoId=req.params.videoId
    try {
        await videoModel.findByIdAndUpdate(videoId,{
            $addToSet:{likes:userId},
            $pull:{dislikes:userId}
        },{new:true})
        res.status(200).json("The video has been liked!")
    } catch (err) {
        next(err)
    }
}

export const dislikeVideo=async(req,res,next)=>{
    const userId=req.user.id
    const videoId=req.params.videoId
    try {
        await videoModel.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:userId},
            $pull:{likes:userId}
        },{new:true})
        res.status(200).json('The video has beed disliked!')
        
    } catch (err) {
        next(err)
    }
}