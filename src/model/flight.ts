import mongoose, { Schema } from "mongoose";

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

export interface Flight extends Document {
	departure: String;
	destination: String;
	duration: Number;
	idAirplane: Number;
	price: Number;
	checkIn: Date;
	checkOut: Date;
}

export const FlightModel = mongoose.model("Flight", flightSchema);