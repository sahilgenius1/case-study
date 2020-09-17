const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const url = require("url");

//creating router object
const router = express.Router();

//requiring models
const User = mongoose.model('User');
const Meeting = mongoose.model('Meeting');

function getCurrentDate() { 
  
    let dateObj = new Date(); 
    let month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
    let day = String(dateObj.getDate()).padStart(2, '0'); 
    let year = dateObj.getFullYear(); 
    let output = year+"-"+month+"-"+day; 

    return output;
} 
//managing routes

const authUtils = require("../utils/auth")

//getting current date meetings by setting default current date
router.use("/",authUtils.authenticate);
router.get("/calendar",(req,res,next)=>{
    console.log(req.claims)
    console.log("success");
    const userId = req.claims.userid;
    // const email = req.query.email;
    const email = req.claims.emailid;
console.log(email)
   
    if(Object.keys(req.query).length===0){
        
        const currentDate = new Date(getCurrentDate()) ;
        Meeting.find({date:currentDate,"users.emailid":`${email}`}).sort({date:1})
                .exec((err,results)=>{
                    if(err){
                        err.status=404;
                        return next(err)
                    }
                    console.log("hello")
                    res.status(200).json(results);
                })
    }else{
        
        const urlParser = url.parse(req.url,true);
        const queryParams = urlParser.query;
        
            const dateToFind =  new Date(queryParams.date)||(new Date(getCurrentDate()));
            const searchText = queryParams.search || " ";
            Meeting.find({date:dateToFind,"users.emailid":`${email}`})
            .sort({date:1})
                    .exec((err,results)=>{
                        if(err){
                            err.status=404;
                            next(err);
                        }
                        res.status(200).json(results);
                    })
        
    }
  
})

//get users
router.get("/users",(req,res,next)=>{
    User.find().exec((err,results)=>{
        if(err){
            err.status=404;
            return next(err)
        }
        res.status(200).json(results)
    })
})






module.exports=router;