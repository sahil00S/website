const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

name:String,
email:String,
phone:String,
destination:String,
travelDate:Date,
travelers:Number

});

module.exports = mongoose.model("Booking",bookingSchema);