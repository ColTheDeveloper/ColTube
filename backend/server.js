import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoute.js"
import commentRoutes from "./routes/commentRoute.js"
import videoRoutes from "./routes/videoRoute.js"
import authRoutes from "./routes/authRoute.js"
import cookieParser from "cookie-parser"

const  app=express()

dotenv.config()

const MONGODB_URI=process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log("DB is Online")
    }).then(()=>{
        app.listen(2500,()=>{
            console.log("server is running")
        })
    }).catch((err)=>{
        console.log(err)
    })

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes )
app.use("/api/users",userRoutes )
app.use("/api/comments",commentRoutes )
app.use("/api/videos",videoRoutes )

app.use((err,req,res,next)=>{
    const status=err.status || 500
    const message=err.message || "Something came up"

    return res.status(status).json({
        success:false,
        status,
        message
    })
})
