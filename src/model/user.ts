import mongoose, { Schema } from "mongoose";
import { privateKey } from "../auth/keys/private-key";
import jwt from 'jsonwebtoken';

const User = new Schema({
    email: {
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
    password: {
        type: String,
        required: true,
        trim: true
    },
    tickets: [{ 
        type: Schema.Types.ObjectId,
        required: false, 
        ref: 'Ticket' 
    }]
});

User.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, privateKey); 
    return token;
}

export const UserModel = mongoose.model('User', User);