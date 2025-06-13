const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    username: { type: String, required: true },
    stall:{type:mongoose.Schema.Types.ObjectId, ref: "Stall", required:true},
    rating:{type:Number, required:true, min:1, max:5},
    comment:{type:String, trim:true}

},{timestamps:true});

module.exports = mongoose.model("Review", reviewSchema);