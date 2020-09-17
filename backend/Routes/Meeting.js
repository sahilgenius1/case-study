
const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const url = require("url")
function getCurrentDate() { 
  
    let dateObj = new Date(); 
    let month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
    let day = String(dateObj.getDate()).padStart(2, '0'); 
    let year = dateObj.getFullYear(); 
    let output = year+"-"+month+"-"+day; 

    return output;
} 
//creating router object
const router = express.Router();
const authUtils = require("../utils/auth")
//requiring models
const User = mongoose.model('User');
const Meeting = mongoose.model('Meeting');
router.use("/",authUtils.authenticate);
//deleting the user by email id
router.delete("/meeting/:meetingId",(req,res,next)=>{
    const m_id=req.params.meetingId;
    const email = req.claims.emailid;

    Meeting.findByIdAndUpdate(m_id,{ $pull : {users : {emailid:email}}
}
       ).exec((err,meetingUpdate)=>{
        if(err){
            err.status = 404;   
            console.log(err.message)
            return next(err)
        }
        res.status(200).json(meetingUpdate)
    })
})



//posting a new meeting
router.post("/meeting",(req,res,next)=>{
    const meeting = req.body;
    Meeting.create(meeting,(err,meetingWithId)=>{
        if(err){
            err.status=500;
            return next(err);
        }
        res.status(200).json(meetingWithId);
    })
})



//adding a new attendee
router.patch("/meeting/:meetingid/:userId",(req,res,next)=>{
    const urlParser = url.parse(req.url,true)
    const queryParams=urlParser.query;  
      
    if(queryParams.action==="add_attendee"){
    let email = queryParams.email;
        email=email.replace(/^"|"$/g, '')
    const meetingId = req.params.meetingid;
    const meeting = req.body;
    const item={_id:req.params.userId,emailid:email}
    console.log(item)
    Meeting.findByIdAndUpdate(meetingId,{$push:{users:{_id:req.params.userId,emailid:email}}})
        .exec((err,meetingUpdate)=>{
            if(err){
                err.status = 404;   
                console.log(err.message)
                return next(err)
            }
            
            res.status(200).json(meetingUpdate)
        })
    }else{
        const error = new Error("path not correct");
        error.status=500;
        return next(error);
    }

})
//getting meeting according to period
router.get("/meeting",(req,res,next)=>{
    const urlParser = url.parse(req.url,true)
    const queryParams=urlParser.query;   
    const period = queryParams.period;
    const email = req.claims.emailid;
    switch(period){
        case 'Past': Meeting.find({date:{$lt:(new Date(getCurrentDate()))},"users.emailid":`${email}`}).exec((err,results)=>{
                if(err){
                    err.status=404;
                    return next(err)
                }
                res.status(200).json(results)
        })
                        break;
        case  'future' : Meeting.find({date:{$gt:(new Date(getCurrentDate()))},"users.emailid":`${email}`}).exec((err,results)=>{
            if(err){
                err.status=404;
                return next(err)
            }
            res.status(200).json(results)
    })
                                break;
         case "all" : Meeting.find({"users.emailid":`${email}`}).exec((err,results)=>{
            if(err){
                err.status=404;
                return next(err)
            }
            res.status(200).json(results)
    })
         break;            
         default : if(Object.keys(req.query).length===0){
        
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
            
           
            
                const dateToFind =  new Date(queryParams.date);
                const searchText = queryParams.search ;
                console.log("Telstra")
                Meeting.find({$or:[{date:dateToFind,"users.emailid":`${email}`},{description:{"$regex": `${searchText}`, "$options":"i"}}]})
                .sort({date:1})
                        .exec((err,results)=>{
                            if(err){
                                err.status=404;
                                next(err);
                            }
                            res.status(200).json(results);
                        })
            
        }
        
}


})


module.exports=router;