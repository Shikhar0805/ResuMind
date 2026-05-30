const express= require('express');
const router=express.Router();
const  AuthController=require('../controllers/auth.controllers');
const AuthMiddleware=require('../middlewares/auth.middleware');
//Routes for authentication
router.post('/register',AuthController.RegisterUser);
router.post('/login',AuthController.LoginUser);
router.get('/logout',AuthController.LogoutUser);
router.get('/getuser',AuthMiddleware.authUser,AuthController.GetUser);
module.exports=router;