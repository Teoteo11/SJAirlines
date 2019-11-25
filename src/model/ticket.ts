import mongoose, { Schema } from "mongoose";
import { Ticket } from "./../index";

const ticketSchema = new Schema({
    idCompany: {
        type: Schema.Types.ObjectId, ref: 'Company'
    },
    idFlight: {
        type: Schema.Types.ObjectId, ref: 'Flight'
    },
    isChecked: {
        type: Boolean,
    }
});
export const TicketModel = mongoose.model('Ticket', ticketSchema);

