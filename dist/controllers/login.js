"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const express_validator_1 = require("express-validator");
const private_key_1 = require("../auth/keys/private-key");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
1. The server verifies if the user is legit and responds with a token (JWT) containing the identity of the user.
2. The token in response is stored locally on the client system, and the user is allowed inside the application.
3. When the user makes changes to his profile, his profile [data + token] is sent to the server.
4. The server first checks if the request contains the token (responds with an error if not passed).
   The token is then verified, once done then the profile data from the payload is checked and respective changes are made to the database.
5. It's same for all the other actions made by the user.
6. When the user “logs out” the identification token is destroyed from the local.
*/
exports.userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    // TODO: fix and sanitize username and password with express-validator
    if (errors.isEmpty()) {
        if (req.body.email && req.body.password) {
            let user = yield user_1.UserModel.findOne({ email: req.body.email, password: req.body.password })
                .then(() => {
                const token = jsonwebtoken_1.default.sign({ email: req.body.email, pass: req.body.password }, private_key_1.privateKey);
                res.status(200).header(token).json({ message: "Login eseguito correttamente" });
            })
                .catch((error) => {
                res.status(404).json({ message: "Email o password non corretti", error: error });
            });
        }
        else {
            return res.status(400).json({ message: "Bad request. Username and password missing." });
        }
    }
    else {
        return res.status(422).json({ errors: errors.array() });
    }
});
