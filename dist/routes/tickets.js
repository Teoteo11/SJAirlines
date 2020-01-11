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
// a che serve?? è un doppione
router.get("/flight", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield flight_1.FlightModel.find());
}));
//GET
//Output of filtered tickets
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield ticket_1.TicketModel.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        return res.status(200).json(ticket);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
}));
//GET
//Output of all tickets
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTickets = yield ticket_1.TicketModel.find();
        return res.status(200).json(allTickets);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
}));
//POST
// TODO validazione dei dati tramite express validator
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //control of entered parameters in the body
    if (req.body.idCompany && req.body.idFlight && req.body.idUser) {
        try {
            // TODO da parallelizzare
            const user = yield user_1.UserModel.findById(req.body.idUser);
            if (!user) {
                return res.status(400).json({ message: "User not exists" });
            }
            const company = yield company_1.CompanyModel.findById(req.body.idCompany);
            if (!company) {
                return res.status(400).json({ message: "Company not exists" });
            }
            const idAirplane = yield flight_1.FlightModel.findById(req.body.idFlight).select("idAirplane");
            if (!idAirplane) {
                return res.status(400).json({ message: "Flight not exists" });
            }
            const numSeats = yield airplane_1.AirplaneModel.findById(idAirplane).select("numSeats");
            //console.log("Airplane : ",airplane);
            let number = Number(numSeats);
            console.log("NUMERO AEREI", numSeats);
            if (number === 0) {
                return res.status(400).json({ message: "Airplane full" });
            }
            const d = airplane_1.AirplaneModel.findByIdAndUpdate(idAirplane, { numSeats: number-- }, (err, raw) => {
                console.log(raw);
            });
            const ticket = new ticket_1.TicketModel({
                idCompany: req.body.idCompany,
                idFlight: req.body.idFlight,
                isChecked: false
            });
            yield ticket.save();
            yield user_1.UserModel.updateOne(user, { $push: { ticket: ticket._id } });
            return res.status(200).json(ticket);
        }
        catch (err) {
            return res.status(400).json({ message: "Error" });
        }
    }
    return res.status(400).json({ message: "Invalid entry" });
}));
//PUT
//updating of values of ticket
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield ticket_1.TicketModel.findOneAndUpdate({ _id: req.params.id }, { isChecked: true });
        return res.status(200).json(ticket);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
}));
//DELETE
//deleting of ticket by id
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield ticket_1.TicketModel.findOne({ ticket: req.params.id });
        const ticket = yield ticket_1.TicketModel.findByIdAndDelete(req.params.id);
        yield user_1.UserModel.updateOne(user, { $pull: { ticket: req.body.id } });
        return res.status(200).json({ message: "Ticket deleted", ticket });
    }
    catch (err) {
        return res.status(400).json({ message: "Id ticket is not present" });
    }
}));
module.exports = router;
