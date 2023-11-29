import express from "express"
import { addVideo, addViews, deleteVideo, getVideo, getVideosWithTags, randomVideos, searchForVideo, subscribedChannelVideos, trendVideos, updateVideo } from "../controllers/videoController.js"
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

//GET VIDEO
router.get("/:id",getVideo)

//UPDATE VIEWS
router.put("/views/:id",addViews)


//GET SUBSCRIBED CHANNEL VIDEO
router.get("/sub",verifyToken, subscribedChannelVideos)

//GET VIDEO WITH TAGS
router.get("/tags", getVideosWithTags)

export default router