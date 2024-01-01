import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    img:{
        type:String,
        default:"https://firebasestorage.googleapis.com/v0/b/coltube-692d5.appspot.com/o/IMG_20230501_153755.jpg?alt=media&token=59407e28-497a-4531-8966-d9c6a43b8906"
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedUsers:{
        type:[String]
    },
    fromGoogle:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const userModel=mongoose.model("User",userSchema)

export default userModel;