import mongoose, { Schema } from "mongoose";
import { Airplane } from './airplane';
import { Flight } from "./flight";

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

export interface Company extends Document {
	name: String;
	airplanes: Array<Airplane>;
	routes: Array<Flight>;
	maxAirplanes: Number;
}

export const CompanyModel = mongoose.model("Company", companySchema);