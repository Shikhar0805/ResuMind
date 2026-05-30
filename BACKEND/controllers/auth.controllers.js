const express = require('express');
const User=require('../models/user.models');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const tokenBlacklist=require('../models/token.blacklist');




// Register User
async function RegisterUser(req,res){
const {email,username,password}=req.body;

if(!username || !email || !password){
    return res.status(400).json({message:"Enter all the fields"});
}

const existingUserEmail=await User.findOne({email});

if(existingUserEmail){
    return res.status(400).json({message:"Email already in use"});
}

const existingUsername=await User.findOne({username});

if(existingUsername){
    return res.status(400).json({message:"Username already in use"});
}


const hash=await bcrypt.hash(password,10);

const newUser = await User.create({
    username,
    email,
    password: hash
});

const token=jwt.sign(
    {
        id:newUser._id, username:newUser.username, email:newUser.email
    },
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)

res.cookie("token",token, { httpOnly: true });
res.status(201).json({message:"User registered successfully",token});

}


// Login User
async function LoginUser(req,res){
    const {email,password}=req.body;
    if(!email || !password ){
        return res.status(400).json({message:"Enter all the fields"});
    }
    const existingUserEmail=await User.findOne({email});

    if(!existingUserEmail){
        return res.status(400).json({message:"Invalid email"});
    }

    const isMatch=await bcrypt.compare(password,existingUserEmail.password);

    if(!isMatch){
        return res.status(400).json({message:"Wrong password"});
    }

    const token=jwt.sign(
        {
            id:existingUserEmail._id,
            username:existingUserEmail.username,
            email:existingUserEmail.email
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );

    res.cookie("token",token);
    res.status(200).json({message:"User logged in successfully"});
}




// Logout User
async function LogoutUser(req,res){

    const token=req.cookies.token;

    if(token)
{
    await tokenBlacklist.create({token});
}
res.clearCookie("token");
res.status(200).json({message:"User logged out successfully"});

}


// Get User
async function GetUser(req,res){
    const user=req.user.id;
    const userData=await User.findById(user);
    if(!userData){
        return res.status(404).json({message:"User not found"});
    }   
    res.status(200).json({user:userData});
}   






module.exports={RegisterUser,LoginUser,LogoutUser,GetUser};