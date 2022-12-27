const express= require('express')
const router = express.Router()
const studentController = require ("../controllers/student.controllers")
router.post('/signup',studentController.Signup)
router.post('/signin',studentController.Signin)

module.exports=router