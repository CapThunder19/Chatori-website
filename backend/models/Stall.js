const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
    stallname: { type: String, required: true, trim: true },
    dishname: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    openinghours: { type: String, required: true, trim: true },
    phonenumber: { type: String, required: true, trim: true },
    dishimage: { type: String, required: true },
    location: {
      type: { 
        type: String, 
        enum: ["Point"], 
        required: true 
      },
      coordinates: {
        type: [Number], 
        required: true
      }
    },
    averagerating: { type: Number, default: 0 },
    numreviews: { type: Number, default: 0 }
  }, { timestamps: true });
  
  stallSchema.index({ location: "2dsphere" });
  
  module.exports = mongoose.model("Stall", stallSchema);