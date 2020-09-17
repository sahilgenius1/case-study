//executing the database script
require("./Data/init");

//requiring packages
const express=require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require('cors')
//requiring router objects
const calendarRouter = require("./Routes/Calender");
const loginRouter = require("./Routes/User");
const meetingRouter = require("./Routes/Meeting")
const authRouter = require("./Routes/Auth")


//creating express application object
const app = express();



//handling the homepage route
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to the meeting application server</h1>")
})


app.use(cors());
app.options('*',cors());

app.use(express.urlencoded());
app.use(express.json());

app.use(authRouter);
app.use(meetingRouter);
app.use("/",loginRouter);
app.use(calendarRouter);

//error handling
app.use((err,req,res,next)=>{
    res.status(err.status||500).send(err.message);
})

//starting the express server
const PORT = process.env.PORT || 3000;

app.listen(3000 , function(err){
    if(err){
        return console.log(err.message);
    }    
     console.log(`The server is running on port ${PORT}`)
})