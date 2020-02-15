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
const airplaneSchema = new mongoose_1.Schema({
    model: {
        type: String,
        required: true,
        trim: true
    },
    numSeats: {
        type: Number,
        required: true,
        trim: true
    }
});
exports.AirplaneModel = mongoose_1.default.model("Airplane", airplaneSchema);
