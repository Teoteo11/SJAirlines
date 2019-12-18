import mongoose, { Schema } from "mongoose";

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  airplanes: [{ type: Schema.Types.ObjectId, ref: "Airplane" }],
  flights: [{ type: Schema.Types.ObjectId, ref: "Flight" }],
  maxAirplanes: {
    type: Number,
    required: true,
    trim: true
  }
});

export const CompanyModel = mongoose.model("Company", companySchema);
