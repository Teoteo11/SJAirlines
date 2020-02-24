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
const express_validator_1 = require("express-validator");
const ticket_1 = require("../model/ticket");
const airplane_1 = require("../model/airplane");
const user_1 = require("../model/user");
const company_1 = require("../model/company");
const flight_1 = require("../model/flight");
exports.getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.id || req.query.email) {
        try {
            const ticket = yield ticket_1.TicketModel.find({
                $or: [req.query.id, req.query.user]
            });
            if (!ticket) {
                return res.status(404).json({ message: "Ticket not found." });
            }
            return res.status(200).json(ticket);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
    else {
        try {
            const allTickets = yield ticket_1.TicketModel.find();
            return res.status(200).json(allTickets);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
});
exports.getTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield ticket_1.TicketModel.findById(req.params.id);
        return res.status(200).json(ticket);
    }
    catch (_a) {
        return res.status(404).json({ message: 'Resource non found.' });
    }
});
exports.addSingleTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Unprocessable entity" });
    }
    try {
        const [user, company, idAirplane] = yield Promise.all([
            user_1.UserModel.findById(req.body.idUser),
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
exports.editSingleTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Unprocessable entity" });
    }
    try {
        let ticket = yield ticket_1.TicketModel.findByIdAndUpdate(req.params.id, { isChecked: true }, { new: true });
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        return res.status(200).json(ticket);
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
exports.deleteSingleTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Unprocessable entity" });
    }
    try {
        const user = yield user_1.UserModel.findOne({ tickets: req.params.id });
        const ticket = yield ticket_1.TicketModel.findByIdAndDelete(req.params.id);
        yield user_1.UserModel.updateOne(user, { $pull: { ticket: req.params.id } });
        return res.status(200).json({ message: "Ticket deleted", ticket });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
