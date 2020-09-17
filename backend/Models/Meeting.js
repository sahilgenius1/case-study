const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : String,
    date : Date,
    startTime : {
        hours : {
            type:Number,
            min:00,
            max:23,
            required:true
        },
        minutes : {
            type:Number,
            min:00,
            max:59,
            required:true
        }
    },
    endTime :{
        hours : {
            type:Number,
            min:00,
            max:23,
            required:true
        },
        minutes : {
            type:Number,
            min:00,
            max:59,
            required:true
        }
    },
    users : [{
            
            emailid : String,
            _id : mongoose.Schema.Types.Mixed
    }]
})
mongoose.model('Meeting',meetingSchema);