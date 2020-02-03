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
const flight_1 = require("../model/flight");
const airplane_1 = require("../model/airplane");
const express_validator_1 = require("express-validator");
exports.getFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.id) {
        try {
            const flight = yield flight_1.FlightModel.findById(req.query.id);
            return res.status(200).json(flight);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
    else {
        try {
            const flights = yield flight_1.FlightModel.find();
            return res.status(200).json(flights);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
});
exports.getFilteredFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Unprocessable entity" });
    }
    try {
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
            flights = flights.filter((flight) => __awaiter(void 0, void 0, void 0, function* () {
                const airplane = (yield airplane_1.AirplaneModel.findById(flight.idAirplane));
                if (Number(airplane.numSeats) - Number(req.params.nSeats) < 0) {
                    return false;
                }
                else {
                    return true;
                }
            }));
            return res.status(200).json(flights);
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});
