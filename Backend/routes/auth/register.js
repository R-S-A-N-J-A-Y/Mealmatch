const express = require("express");
const bcrypt = require("bcrypt");
const route = express.Router();
const User = require('../../models/UserModel');


route.get("/",async(req,res)=>{
  const users = await User.find();
  res.json(users);
})

route.post('/', async(req,res) =>{
const {name , password , role , foodPreference , locationName , locationLatitude ,locationLongitude,email,mobileNumber} = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
 const newUser = await User.create({
    name:name,
    role : role,
    email : email,
    foodPreference : foodPreference,
    location : {
        name : locationName,
        coordinates : {
            lat : locationLatitude,
            lon : locationLongitude
        }
    },
    mobile : mobileNumber,
    password:hashedPassword
})
if(newUser)
res.send(newUser);

})


route.delete("/",async(req,res)=>{
  await User.deleteMany();
   res.send("scucess");
})

module.exports = route;