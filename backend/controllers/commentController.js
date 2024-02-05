import { createError } from "../middlewares/error.js"
import commentModel from "../models/commentModel.js"
import videoModel from "../models/videoModel.js"


export const addComment=async(req,res,next)=>{
    try {
        const newComment= new commentModel({
            userId: req.user.id, ...req.body
        })
        const savedComment= await newComment.save()

        res.status(200).json(savedComment)
        
    } catch (err) {
        next(err)
    }
}


export const getComment=async(req,res,next)=>{
    try {
        const comments= await commentModel.find({videoId:req.params.videoId}).sort({createdAt:-1})
        res.status(200).json(comments)        
    } catch (err) {
        next(err)
    }
}


export const deleteComment=async(req,res,next)=>{
    try {
        const comment= await commentModel.findById(req.params.id)
        const video= await videoModel.findById(comment.videoId)
        if(req.user.id===comment.userId || req.user.id===video.userId){
            await commentModel.findByIdAndDelete(req.params.id)

            res.status(200).json("Comment is deleted")
        }else{
            next(createError(403,"You can only delete your comments"))
        } 
        
    } catch (err) {
        next(err)
    }
}