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
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const express_validator_1 = require("express-validator");
const ticket_1 = require("../model/ticket");
const airplane_1 = require("../model/airplane");
const company_1 = require("../model/company");
const flight_1 = require("../model/flight");
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.username) {
            let user = yield user_1.UserModel.findOne({ name: req.query.name });
            return res.status(200).json(user);
        }
        // if (req.query.username || req.query.name || req.query.surname) {
        //   let user = await UserModel.find({
        //     $or: [
        //       { username: req.query.username },
        //       { name: req.query.name },
        //       { surname: req.query.surname }
        //     ]
        //   });
        //   return res.status(200).json(user);
        // }
        else {
            let users = yield user_1.UserModel.find();
            return res.status(200).json(users);
        }
    }
    catch (error) {
        return res.status(400).json({ message: "User not found", error: error });
    }
});
// router.get("/:id", async (req, res) => {
//   try {
//     if (req.params.id) {
//       res.json(await UserModel.findById(req.params.id));
//     }
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
//   return;
// });
exports.addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //control of params added
    const userExist = yield user_1.UserModel.findOne({ username: req.body.username });
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Unprocessable entity" });
    }
    if (userExist) {
        return res.status(400).json({ message: "User already exists" });
    }
    let user = new user_1.UserModel({
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        email: req.body.email,
        tickets: []
    });
    try {
        yield user.save();
        return res.status(201).json(user);
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name) {
        //{"new" : true} --> allows the update of the value
        const user = yield user_1.UserModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        return res.json(user);
    }
    if (req.body.username) {
        if (yield user_1.UserModel.findOne({ username: req.body.username })) {
            return res.status(400).json({ message: "This username already exists" });
        }
        const user = yield user_1.UserModel.findByIdAndUpdate(req.params.id, { username: req.body.username }, { new: true });
        return res.json(user);
    }
    if (req.body.surname) {
        const user = yield user_1.UserModel.findByIdAndUpdate(req.params.id, { surname: req.body.surname }, { new: true });
        return res.json(user);
    }
    return res.status(400).json({ message: "Please,insert the values" });
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.UserModel.findOneAndDelete({
            username: req.params.username
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User eliminated :", user });
    }
    catch (error) {
        return res.status(404).json({ message: "User not found" });
    }
});
exports.getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Unprocessable entity" });
        }
        res
            .status(200)
            .json((yield user_1.UserModel.findById(req.params.idUser)).tickets);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.addTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Unprocessable entity" });
    }
    try {
        const [user, company, idAirplane] = yield Promise.all([
            user_1.UserModel.findById(req.params.idUser),
            company_1.CompanyModel.findOne({ flights: req.body.idFlight }),
            flight_1.FlightModel.findById(req.body.idFlight).select("idAirplane")
        ]);
        if (!user) {
            return res.status(400).json({ message: "User not exists" });
        }
        if (!company) {
            return res.status(400).json({ message: "Company not exists" });
        }
        if (!idAirplane) {
            return res.status(400).json({ message: "Flight not exists" });
        }
        let numSeats = yield airplane_1.AirplaneModel.findById(idAirplane).select("numSeats");
        if (Number(numSeats) === 0) {
            return res.status(400).json({ message: "Airplane full" });
        }
        const ticket = new ticket_1.TicketModel({
            idCompany: req.body.idCompany,
            idFlight: req.body.idFlight,
            isChecked: false
        });
        yield Promise.all([
            ticket.save(),
            user_1.UserModel.updateOne(user, { $push: { ticket: ticket._id } }),
            airplane_1.AirplaneModel.findByIdAndUpdate(idAirplane, {
                numSeats: Number(numSeats) - 1
            })
        ]);
        return res.status(200).json(ticket);
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Unprocessable entity" });
    }
    try {
        const user = yield user_1.UserModel.findById(req.params.Id);
        const ticket = yield ticket_1.TicketModel.findByIdAndDelete(req.params.id);
        yield user_1.UserModel.updateOne(user, { $pull: { ticket: req.params.id } });
        return res.status(200).json({ message: "Ticket deleted", ticket });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
