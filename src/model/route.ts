import mongoose, { Schema } from "mongoose";
import { Route } from "./../index";


const routeSchema = new Schema({
    placeDeparture: {
        type: String,
        required: true,
        trim: true
    },
    placeDestination: {
        type: String,
        required: true,
        trim: true
    }
})
export const RouteModel = mongoose.model('Route', routeSchema);

