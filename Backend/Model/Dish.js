const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
    //dish id is _id, inbuilt ObjectID for mongodb
    dishName : String,
    imageUrl : String,
    isPublished : Boolean,
}, {timestamps : true});


const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;