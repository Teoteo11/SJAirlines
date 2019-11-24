import mongoose, { Schema } from "mongoose";
import { Flight } from "./../index";


const flightSchema = new Schema({
    departure: {
        type: String,
        required: true,
        trim: true
    },
    destination: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        trim: true
    },
    idAirplane: {
        type: Schema.Types.ObjectId, ref: 'Airplane'
    },

});

export const FlightModel = mongoose.model('Flight', flightSchema);

