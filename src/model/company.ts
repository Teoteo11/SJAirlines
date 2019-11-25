import mongoose, { Schema } from "mongoose";
import { Company } from "./../index";

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    airplanes: { type: Schema.Types.ObjectId, ref: 'Airplane' },
    routes: { type: Schema.Types.ObjectId, ref: 'Route' },
});


export const CompanyModel = mongoose.model('Company', companySchema);

