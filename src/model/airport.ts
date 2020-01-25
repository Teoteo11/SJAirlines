import mongoose, { Schema } from "mongoose";

const airportSchema = new Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
});

export const AirportModel = mongoose.model("Airport", airportSchema);