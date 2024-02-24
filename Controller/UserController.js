const express = require('express');
const User=require('../Model/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const server = express();
server.use(cookieParser());
require('dotenv').config();




    //Api endpoint to register user first check wheather user already exist or not

    const registerUser = async (req, res) => {

        try {

            const { name, email, password } = req.body;
            // console.log(email)


            // check wheather user already exist or not
            const user = await User.findOne({ email: email })
            if (user) {
                return res.status(400).send('user already exist')
            }
            console.log(user)
            //create new user
            const newUser = new User({
                name: name,
                email: email,
                password: password
            })

            // //save user to database
            await newUser.save();
            res.status(200).send('user registered successfully')

        }



        catch (err) {
            res.status(500).send('something went wrong')
        }
    }

    //login endpoint
    exports.loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;

            //check this user exist or not
            const user = await User.findOne({ email: email })
            if (!user) {
                return res.status(400).send('user not found')
            }

            // comapre password with hashpassword
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
               return  res.status(400).send('invalid credentials')
            }

            // create token
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
            //set tokon in cookie
            res.cookie('authToken', token, { httpOnly: false, })
            res.status(200).send('user logged in successfully')
        }
        catch (err) {
            send(err)
        }
    }

    //update password api endpoint user will enter old password and new password and confirm password
    exports.updatePassword = async (req, res) => {
        // const token = req.cookies.authToken;
        try {
            const token = req.header('Authorization'); 
            console.log(token)
            
            
            
            const { oldPassword, newPassword, confirmPassword } = req.body;
          
            
            const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findOne({ _id: verifyUser.id })
            // console.log(user)
            const isMatch = await bcrypt.compare(oldPassword, user.password)
            console.log(isMatch)
            // console.label(isMatch)
            if (!isMatch) {
                return res.status(400).send('invalid credentials')
            }
            if (newPassword !== confirmPassword) {
                return res.status(400).send('password not matched')
            }
        
            // console.log(hashPassword)
            user.password = newPassword
            await user.save()
            res.status(200).send('password updated successfully')
        }
        catch (err) {
            res.send(err+ "custom error")
        }
    }

    //logout endpoint
    exports.logoutUser = async (req, res) => {
        try {
            res.clearCookie('authToken')
            res.status(200).send('user logged out successfully')
        }
        catch (err) {
            res.send(err)
        }
    }

    //api endpoint to get user name from cookie
    exports.isLoggedin = async (req, res) => {
        // console.log(req.cookies.authToken)
        try {
          
            const token = req.cookies.authToken;
            
            const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
         res.send({
            succuss:true,
            user:verifyUser
         })
        }
        catch (err) {
            res.status(500).send({
                message: 'something went wrong!',
                err: err.message
            })
            
        }
    }
    exports.registerUser = registerUser;