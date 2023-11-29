import mongoose from "mongoose"

const commentSchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    videoId:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    
},{timestamps:true})

const commentModel=mongoose.model("Comment",commentSchema)

export default commentModel;