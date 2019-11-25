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
const user_1 = require("./../model/user");
const ticket_1 = require("./../model/ticket");
const company_1 = require("../model/company");
const flight_1 = require("../model/flight");
const airplane_1 = require("../model/airplane");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.idCompany && req.body.idFlight && req.body.idUser) {
        const user = yield user_1.UserModel.findById(req.body.idUser);
        const company = yield company_1.CompanyModel.findById(req.body.idCompany);
        const flight = yield flight_1.FlightModel.findById(req.body.idFlight);
        const airplane = yield airplane_1.AirplaneModel.findOne(Object(flight)["idAirplane"]);
        if (Object(airplane)["numSeats"] === 0) {
            return res.status(400).json({ message: "Airplane full" });
        }
        airplane_1.AirplaneModel.updateOne(airplane, { numSeats: Object(airplane)["numSeats"]-- });
        const ticket = new ticket_1.TicketModel({
            idCompany: req.body.idCompany,
            idFlight: req.body.idFlight,
            isChecked: false
        });
        yield ticket.save();
        yield user_1.UserModel.updateOne(user, { ticket: ticket._id });
        return res.status(200).json(ticket);
    }
    return res.status(400).json({ message: "Invalid entry" });
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTickets = yield ticket_1.TicketModel.find();
        return res.status(200).json(allTickets);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield ticket_1.TicketModel.findById(req.params.id);
        return res.status(200).json(ticket);
    }
    catch (err) {
        return res.status(404).json({ message: "Ticket not found" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = ticket_1.TicketModel.findOneAndUpdate({ _id: req.params.id }, { isChecked: true });
        return res.status(200).json(ticket);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield ticket_1.TicketModel.findOneAndRemove({ _id: req.params.id });
        const user = yield ticket_1.TicketModel.findOne({ ticket: { _id: req.params.id } });
        yield user_1.UserModel.updateOne(user, { ticket: [] });
        return res.status(200).json({ message: "Ticket deleted", ticket });
    }
    catch (err) {
        return res.status(400).json({ message: "Ticket does not exist" });
    }
}));
module.exports = router;
