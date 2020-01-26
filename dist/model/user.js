"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const private_key_1 = require("../auth/keys/private-key");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            required: false,
            ref: 'Ticket'
        }]
});
User.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({ _id: this._id, isAdmin: this.isAdmin }, private_key_1.privateKey);
    return token;
};
exports.UserModel = mongoose_1.default.model('User', User);
