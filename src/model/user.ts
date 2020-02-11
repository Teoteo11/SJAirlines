import mongoose, { Schema, Document, Model } from "mongoose";
import { Ticket } from './ticket';

const UserSchema: Schema = new Schema({
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

export interface User extends Document {
	username: String;
	name: String;
	surname: String;
	password: String;
	tickets: Array<Ticket>;
}

export const UserModel: Model<User> = mongoose.model('User', UserSchema);