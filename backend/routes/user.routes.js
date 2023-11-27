const express = require("express")
const router = express.Router()
const {registerUser, loginUser, uploadPhoto}= require("../controllers/user.controller")

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/upload-image", uploadPhoto)

module.exports =router