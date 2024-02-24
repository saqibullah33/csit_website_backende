const express=require('express');
const router=express.Router();
const {registerUser,loginUser,logoutUser,isLoggedin,updatePassword}=require('../Controller/UserController')

router.post('/register',registerUser).
post('/login',loginUser).
get('/logout',logoutUser).
get('/isloggedin',isLoggedin).put('/updatepassword',updatePassword)

module.exports=router;