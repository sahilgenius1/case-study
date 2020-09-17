const express= require("express");
const router=express.Router();
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const  User = mongoose.model('User');


// function getUser(emailid,password){
//     return users.find(function(user){
//             return user.emailid===emailid&&user.password===password;
//     })
// }



router.post('/login', (req, res, next) => {
        const credentials = req.body;

        User
            .findOne(credentials)
                .exec((error,results)=>{
                    if(error || Object.keys(results).length===0 ){
                        error.status=500;
                        return next(err);
                    }
                    if(!req.body.emailid && !req.body.password) {
                        const err = new Error('USERNAME/PASSWORD/BOTH missing in /login POST request ');
                        err.status = 403
                        return next( err )
                    }
                        let email = req.body.emailid
                        let password = req.body.password
                       
                        const claims = {   emailid: email , userid:results._id  }
                        jwt.sign(claims, 'shh...', {expiresIn: '24h'}, function(error, token) {
                            if(error) return res.status(401).json({ message: error.message })

                            res.status(200).json({
                                message: 'Signed in sucessfully',
                                token: token,
                                email: results.emailid,
                                name:results.name
                            })
                        });
                
                })





    })

    module.exports=router;