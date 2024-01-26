import { createError } from "../middlewares/error.js"
import userModel from "../models/userModel.js"
import videoModel from "../models/videoModel.js"


export const getVideo=async(req,res,next)=>{
    try {
        const foundVideo= await videoModel.findById(req.params.id)
        res.status(200).json(foundVideo)
    } catch (err) {
        next(err)
    }
}

export const getChannelVideos=async(req,res,next)=>{
    try {
        const foundVideo= await videoModel.find({userId:req.params.id})
        res.status(200).json(foundVideo)
    } catch (err) {
        next(err)
    }
}


export const trendVideos=async(req,res,next)=>{
    try {
        const videos= await videoModel.find().sort({views:-1})
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}


export const getVideosWithTags=async(req,res,next)=>{
    console.log(req.query.tags)
    const tags= req.query.tags.split(",")
    console.log(tags)
    try {
        const videos= await videoModel.find({tags: {$in:tags}}).limit(20)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}


export const searchForVideo=async(req,res,next)=>{
    const query= req.query.q
    try {
        const videos= await videoModel.find({
            title:{ $regex:query, $options:"i"}
        }).limit(20)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}


export const randomVideos=async(req,res,next)=>{
    try {
        const videos= await videoModel.aggregate([{$sample:{size:40}}])
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}


export const subscribedChannelVideos=async(req,res,next)=>{
    try {
        const user=await userModel.findById(req.user.id)
        const subscribedChannel=user.subscribedUsers
        
        const list= await Promise.all(
            subscribedChannel.map((channelId)=>{
                return videoModel.find({userId: channelId})
            })
        )
        
        res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt))
    } catch (err) {
        next(err)
    }
}


export const addViews=async(req,res,next)=>{
    try {
        await videoModel.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        res.status(200).json("The view has been increased.")
    } catch (err) {
        next(err)
    }
}


export const addVideo=async(req,res,next)=>{
    const newVideo= new videoModel({
        userId:req.user.id,
        ...req.body
    })
    try {
        const savedVideo= await newVideo.save()

        res.status(201).json(savedVideo)
    } catch (err) {
        next(err)
    }
}


export const updateVideo=async(req,res,next)=>{
    try {
        const foundVideo= await videoModel.findById(req.params.id)
        if(!foundVideo) return next(createError(404,"Video not found!"))

        if(req.user.id===foundVideo.userId){
            const updatedVideo= await videoModel.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})

            res.status(200).json(updatedVideo)
        }else{
            return next(createError(403,"You can only update your video!"))
        }
        
    } catch (err) {
        next(err)
    }
}


export const deleteVideo=async(req,res,next)=>{
    
    try {
        const video= await videoModel.findById(req.params.id)
        if(!video) return next(createError(404,"Video not found!"))

        if(req.user.id===video.userId){
            await videoModel.findByIdAndDelete(req.params.id)
            res.status(200).json("Video successfully deleted")
        }else{
            return next(createError(403,"you can only delete the video you created"))
        }
    } catch (err) {
        next(err)
    }
}