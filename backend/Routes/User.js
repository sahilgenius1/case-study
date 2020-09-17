const express = require("express");
const path = require('path');
const mongoose = require('mongoose');

//creating router object
const router = express.Router();

//requiring models
const User = mongoose.model('User');
const Meeting = mongoose.model('Meeting');

//routes
router.post("/login",(req,res,next)=>{
    const user = req.body;
    User.create(user,(err,userWithId)=>{
        if(err){
            console.log("hi");
            err.status=500;
            return next(err)
        }
        res.status(200).json(userWithId);
    })
})


module.exports=router
