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
const flight_1 = require("../model/flight");
const airplane_1 = require("../model/airplane");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield flight_1.FlightModel.find());
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            res.json(yield flight_1.FlightModel.findById(req.params.id));
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
    return;
}));
// dargli un senso
router.get("/:idAirport/:nSeats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.idAirport && req.params.nSeats) {
            let flights;
            if (req.query.checkOut && req.query.destination) {
                flights = (yield flight_1.FlightModel.find({
                    departure: req.params.idAirport,
                    checkIn: req.query.checkIn,
                    destination: req.query.destination,
                    checkOut: req.query.checkOut
                }));
            }
            else {
                flights = (yield flight_1.FlightModel.find({
                    departure: req.params.idAirport,
                    checkIn: req.query.checkIn
                }));
            }
            res.status(200).json(flights.filter((flight) => __awaiter(void 0, void 0, void 0, function* () {
                const airplane = (yield airplane_1.AirplaneModel.findById(flight.idAirplane));
                if (Number(airplane.numSeats) - Number(req.params.nSeats) < 0) {
                    return false;
                }
                else {
                    return true;
                }
            })));
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
    return;
}));
module.exports = router;
