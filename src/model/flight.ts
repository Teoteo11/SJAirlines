import mongoose, { Schema } from "mongoose";
import { Flight } from "./../index";

const flightSchema = new Schema({
	departure: {
		type: Schema.Types.ObjectId,
		ref: "Airport"
	},
	destination: {
		type: Schema.Types.ObjectId,
		ref: "Airport"
	},
	duration: {
		type: Number,
		required: true,
		trim: true
	},
	idAirplane: {
		type: Schema.Types.ObjectId,
		ref: "Airplane"
	},
	price: {
		type: Number,
		required: true
	},
	checkIn: {
		type: Date,
		required: true
	},
	checkOut: {
		type: Date,
		required: true
	}
});

export const FlightModel = mongoose.model("Flight", flightSchema);
