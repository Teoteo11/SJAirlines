import mongoose, { Schema } from "mongoose";
import { User } from "./../index";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    ticket: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],

});

export const UserModel = mongoose.model('User', userSchema);

