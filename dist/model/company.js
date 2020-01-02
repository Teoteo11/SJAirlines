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
const companySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    airplanes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Airplane" }],
    flights: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Flight" }],
    maxAirplanes: {
        type: Number,
        required: true,
        trim: true
    }
});
exports.CompanyModel = mongoose_1.default.model("Company", companySchema);
