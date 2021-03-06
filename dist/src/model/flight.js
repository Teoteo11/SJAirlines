"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const flightSchema = new mongoose_1.Schema({
    departure: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Airport"
    },
    destination: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Airport"
    },
    duration: {
        type: Number,
        required: true,
        trim: true
    },
    idAirplane: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.FlightModel = mongoose_1.default.model("Flight", flightSchema);
