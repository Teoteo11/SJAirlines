import mongoose, { Schema, Document, Model } from "mongoose";
import { Ticket } from "./ticket";

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
  tickets: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Ticket"
    }
  ]
});

export interface User extends Document {
<<<<<<< HEAD
	username: String;
	name: String;
    surname: String;
    email: String;
	password: String;
	tickets: Array<Ticket>;
=======
  username: String;
  name: String;
  surname: String;
  email: String;
  password: String;
  tickets: Array<Ticket>;
>>>>>>> 9c3692c403aa3460c4259c8f4d9c03e0923cf53b
}

export const UserModel: Model<User> = mongoose.model("User", UserSchema);
