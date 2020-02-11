import mongoose, { Schema } from "mongoose";

const airplaneSchema = new Schema({
    model: { 
        type: String, 
        required: true, 
        trim: true },
    numSeats: { 
        type: Number, 
        required: true, 
        trim: true }
});

export interface Airplane extends Document {
	model: String;
	numSeats: Number;
}

export const AirplaneModel = mongoose.model('Airplane', airplaneSchema);