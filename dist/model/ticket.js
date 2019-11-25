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
const ticketSchema = new mongoose_1.Schema({
    idCompany: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Company'
    },
    idFlight: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Flight'
    },
    isChecked: {
        type: Boolean,
    }
});
exports.TicketModel = mongoose_1.default.model('Ticket', ticketSchema);
