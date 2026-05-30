const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username is already in use"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email is already in use"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }
})

const userModel=mongoose.model('User',userSchema);

module.exports=userModel;