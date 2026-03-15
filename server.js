const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/User");
const Booking = require("./models/Booking");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/travelDB")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));


/* REGISTER */

app.post("/register", async(req,res)=>{

const {name,email,password} = req.body;

const hashedPassword = await bcrypt.hash(password,10);

const user = new User({
name,
email,
password:hashedPassword
});

await user.save();

res.json({message:"User registered"});

});


/* LOGIN */

app.post("/login", async(req,res)=>{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
return res.json({message:"User not found"});
}

const valid = await bcrypt.compare(password,user.password);

if(!valid){
return res.json({message:"Wrong password"});
}

res.json({message:"Login successful"});

});


/* BOOKING */

app.post("/booking", async(req,res)=>{

const booking = new Booking(req.body);

await booking.save();

res.json({message:"Booking saved successfully"});

});


/* ADMIN VIEW */

app.get("/bookings", async(req,res)=>{

const bookings = await Booking.find();

res.json(bookings);

});


app.listen(3000,()=>{

console.log("Server running on http://localhost:3000");

});