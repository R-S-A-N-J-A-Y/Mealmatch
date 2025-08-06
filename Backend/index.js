const express  = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/mongodb')
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();
const regRoute = require('./routes/auth/register');
const loginRoute = require('./routes/auth/login');


app.use("/api/register",regRoute);
app.use("/api/login" , loginRoute);




app.listen(process.env.PORT,()=>{
    console.log(`running on localhost:${process.env.PORT}`);
})