"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateKeyPath = './keys/private.key';
const publicKeyPath = './keys/private.key';
const PRIVATE_KEY = fs_1.default.readFileSync(privateKeyPath, 'utf-8');
const PUBLIC_KEY = fs_1.default.readFileSync(privateKeyPath, 'utf-8');
let payload = {
    data1: "Data 1",
    data2: "Data 2",
    data3: "Data 3",
    data4: "Data 4",
};
let i = 'Mysoft corp'; // Issuer 
let s = 'some@user.com'; // Subject 
let a = 'http://mysoftcorp.in'; // Audience
let signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "12h",
    algorithm: "RS256"
};
exports.token = jsonwebtoken_1.default.sign(payload, PRIVATE_KEY, signOptions);
console.log(exports.token);
