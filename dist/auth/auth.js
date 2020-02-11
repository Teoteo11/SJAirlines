"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const public_key_1 = require("./keys/public-key");
exports.auth = (req, res, next) => {
    jsonwebtoken_1.default.verify(req.headers.authorization, public_key_1.publicKey, (err) => {
        err ? res.status(401).send({ message: "Ciao" }) : next();
    });
};
