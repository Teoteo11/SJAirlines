import fs from 'fs';
import jwt, { SignOptions } from 'jsonwebtoken';

const privateKeyPath = './keys/private.key';
const publicKeyPath = './keys/private.key';

const PRIVATE_KEY: jwt.Secret = fs.readFileSync(privateKeyPath, 'utf-8');
const PUBLIC_KEY: string = fs.readFileSync(privateKeyPath, 'utf-8');

let payload = {
  data1: "Data 1",
  data2: "Data 2",
  data3: "Data 3",
  data4: "Data 4",
};

let i = 'Mysoft corp';          // Issuer 
let s = 'some@user.com';        // Subject 
let a = 'http://mysoftcorp.in'; // Audience

let signOptions: SignOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: "12h",
  algorithm: "RS256"
};

export const token = jwt.sign(payload, PRIVATE_KEY, signOptions);
console.log(token);