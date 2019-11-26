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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("../model/user");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.username && req.body.name && req.body.surname) {
        let user = new user_1.UserModel({
            username: req.body.username,
            name: req.body.name,
            surname: req.body.surname,
            tickets: [],
        });
        try {
            yield user.save();
            res.status(201).json(user);
        }
        catch (err) {
            res.status(400).json({ message: err });
        }
    }
    return res.status(400).json({ message: "Invalid entry" });
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.query.username);
        if (req.query.username) {
            const user = yield user_1.UserModel.find({ username: req.query.username });
            return res.json(user);
        }
        const users = yield user_1.UserModel.find();
        return res.status(201).json(users);
    }
    catch (err) {
        return res.status(400).json({ message: "User not found" });
    }
}));
router.put("/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.UserModel.find({ username: req.params.username });
    if (user) {
        let json = [];
        if (req.body.username) {
            json.push({ username: req.body.username });
        }
        if (req.body.name) {
            json.push({ name: req.body.name });
        }
        if (req.body.surname) {
            json.push({ surname: req.body.surname });
        }
        try {
            yield user_1.UserModel.updateOne(user, Object.assign({}, json));
            res.status(201).json(user);
        }
        catch (err) {
            res.status(400).json({ message: err });
        }
    }
    return res.status(400).json({ message: "Invalid entry" });
}));
router.delete("/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.UserModel.findOneAndRemove({ username: req.params.username });
        return res.status(200).json({ message: "User eliminated :", user });
    }
    catch (error) {
        return res.status(404).json({ message: "User not found" });
    }
}));
module.exports = router;
