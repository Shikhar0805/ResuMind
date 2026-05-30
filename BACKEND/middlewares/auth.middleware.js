const jwt=require('jsonwebtoken');
const tokenBlacklist=require('../models/token.blacklist');
async function authUser(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Access denied. No token provided."});
    }
    const isBlacklisted=await tokenBlacklist.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message:"Token Invalid. Please login again."});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(401).json({message:"Invalid token."});
    }
}

module.exports={authUser};