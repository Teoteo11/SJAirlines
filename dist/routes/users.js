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
//POST
//if don't exist    --> added
//else              --> message
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //control of params added
    if (!Number(req.body.username) && !Number(req.body.name) && !Number(req.body.surname)) {
        const userExist = yield user_1.UserModel.findOne({ username: req.body.username });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
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
//GET
//output of all users or output filtered users
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.username || req.query.name || req.query.surname) {
            const user = yield user_1.UserModel.find({ $or: [{ username: req.query.username }, { name: req.query.name }, { surname: req.query.surname }] });
            return res.json(user);
        }
        const users = yield user_1.UserModel.find();
        return res.status(201).json(users);
    }
    catch (err) {
        return res.status(400).json({ message: "User not found" });
    }
}));
//PUT
//updating of values like name,surname or username 
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name) {
        //{"new" : true} --> allows the update of the value 
        const user = yield user_1.UserModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, { "new": true });
        return res.json(user);
    }
    if (req.body.username) {
        if (yield user_1.UserModel.findOne({ username: req.body.username })) {
            return res.status(400).json({ message: "This username already exists" });
        }
        const user = yield user_1.UserModel.findByIdAndUpdate(req.params.id, { username: req.body.username }, { "new": true });
        return res.json(user);
    }
    if (req.body.surname) {
        const user = yield user_1.UserModel.findByIdAndUpdate(req.params.id, { surname: req.body.surname }, { "new": true });
        return res.json(user);
    }
    return res.status(400).json({ message: "Please,insert the values" });
}));
//DELETE
//deleting of user by username
router.delete("/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.UserModel.findOneAndDelete({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User eliminated :", user });
    }
    catch (error) {
        return res.status(404).json({ message: "User not found" });
    }
}));
module.exports = router;
