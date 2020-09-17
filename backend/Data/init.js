const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myappdata",{useNewUrlParser:true,
useUnifiedTopology:true
});
//creating models here
require("../Models/User");
require("../Models/Meeting");
//setting event emitter connection
const connection = mongoose.connection;

connection.on('error',(err)=>{
    console.error.bind(console,'connection error:',err.message);
    process.exit(0);
})
connection.on('open',function(){
    console.log("Connected to Mongodb Database");
})

//module.exports=connection