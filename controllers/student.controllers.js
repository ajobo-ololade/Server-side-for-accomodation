const studentModel = require('../models/student.models')
const cloudinary = require('cloudinary')
const jwt = require("jsonwebtoken")
const JWT = process.env.JWT_SECRET
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

const Signup = ((req, res) => {
    
    // console.log(req.body)
    const newUser = req.body
    studentModel.findOne({email:req.body.email}, (err, result) => {
        if (err) {
            console.log(`An ERROR OCCURED IN SIGNING UP`)

        } else {
            if (result) {
                res.send({message:`Email already exist`,status:false})
                console.log(`EMAIL ALREADY EXIST`)

            } else {
                studentModel.findOne({username:req.body.username},(err,result)=>{
                    if (result) {
                        console.log(`USERNAME ALREADY EXIST`)
                        res.send({message:`Username already exist `,status:false})
                        
                    } else {
                        const form = new studentModel(newUser)
                        form.save((err) => {
                            if (err) {
                                console.log(`AN ERROR OCCURED `)
                                res.send({ message: `Sign Up failed please try again later`,status:false })
        
                            } else {
                                res.send({ message: `REGISTRATION SUCCESSFUL`,status:true })
        
        
                            }
                        })
                    }

                })
            }

        }
    })

})

const Signin=((req,res)=>{
    const username = req.body.username
    const password = req.body.password 
    studentModel.findOne({username:username},(err,user)=>{
        if (err) {
            res.status(501).send({message:`Server error`,status:false})
            
        } else {
            if (!user) {
                res.send({message:`NOT FOUND`,status:false})

                
            } else {
                user.validatePassword(password,(err,same)=>{
                    if (err) {
                        console.log(`ERROR in getting token`)
                        
                    } else {
                        if (same) {
                            const token = jwt.sign({username},JWT,{expiresIn:3600})
                            // console.log(token)
                            res.send({message:`CORRECT PASSWORD`,status:true,token,user})
                            
                        } else {
                            res.send({message:`INVALID PASSWORD`,status:false})
                            
                        }
                        
                    }
                })
                
            }
            
            
        }
    })
})
module.exports ={Signup,Signin}