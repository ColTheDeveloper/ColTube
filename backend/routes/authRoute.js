import express from "express"
import { signin, signinWithGoogle, signup } from "../controllers/authController.js"

const router=express.Router()

// CREATE A USER
router.post("/signup",signup)
// SIGN IN
router.post("/signin",signin)
// GOOGLE SIGN IN
router.post("/google",signinWithGoogle)

export default router