import express from "express"
import { addVideo, addViews, deleteVideo, getChannelVideos, getVideo, getVideosWithTags, randomVideos, searchForVideo, subscribedChannelVideos, trendVideos, updateVideo } from "../controllers/videoController.js"
import { verifyToken } from "../middlewares/verifyToken.js"

const router=express.Router()

//ADD VIDEO
router.post('/',verifyToken,addVideo)

//DELETE VIDEO
router.delete('/:id',verifyToken,deleteVideo)

//UPDATE VIDEO
router.put("/:id",verifyToken,updateVideo)

//GET TRENDING VIDEO
router.get("/trend",trendVideos)

//GET RANDOM VIDEO
router.get("/random",randomVideos)

//SEARCH FOR VIDEO WITH NAME
router.get("/search", searchForVideo)

//GET SUBSCRIBED CHANNEL VIDEO
router.get("/sub",verifyToken, subscribedChannelVideos)

//GET VIDEO WITH TAGS
router.get("/tags", getVideosWithTags)

//GET VIDEO
router.get("/:id",getVideo)

//GET CHANNEL VIDEO
router.get("/channel/:id",getChannelVideos)

//UPDATE VIEWS
router.put("/views/:id",addViews)



export default router