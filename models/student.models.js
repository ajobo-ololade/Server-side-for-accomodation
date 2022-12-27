const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
// const imageSchema =mongoose.Schema({
//     image_url:{
//         require:true,
//         type:String,
//     },
//     caption:{
//         require:true,
//         type:String,

//     },
//     username:{
//         require:true,
//         type:String
//     },
//     ProfilePicture:{
//         require:true,
//         type:String,
//     }
    
// })
// const followersSchema= mongoose.Schema({
//     image_url:{
//         require:true,
//         type:String,
//     },
//     username:{
//         type:String,
//         require:true,
//     },
//     fullname:{
//         type:String,
//         require:true
//     }


// })
// 
const studentSchema = mongoose.Schema({
    email:{
        type:String,
        require:true
    },
   
    

    // fullname:{
    //     type:String,
    //     require:true
    // },
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    
   
    date:{
        type:Date,
        default:Date.now

    },
    



})
let saltRound = 5;
studentSchema.pre('save',function(next){
    bcrypt.hash(this.password,saltRound,(err,hashedPassword)=>{
        if (err) {
            console.log(`error in hashing password `)
            
        } else {
            this.password = hashedPassword
            next()
            
        }
    })
})
studentSchema.methods.validatePassword = function(password,callback)
{
    bcrypt.compare(password,this.password,(err,same)=>{
        if (!err) {
            callback(err,same)
            
        } 
        else {
           next()
            
        }
    })
}
let studentModel = mongoose.model("user_tb",studentSchema)
module.exports=studentModel
