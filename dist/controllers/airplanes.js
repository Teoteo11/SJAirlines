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
const airplane_1 = require("../model/airplane");
const express_validator_1 = require("express-validator");
const chalk_1 = __importDefault(require("chalk"));
exports.getAirplanes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let airplane;
        req.query.id ?
            airplane = yield airplane_1.AirplaneModel.findById(req.query.id) :
            airplane = yield airplane_1.AirplaneModel.find();
        return res.status(200).json({ airplane });
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        return res.status(500).json({ message: error });
    }
});
exports.addAirplane = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newAirplane = new airplane_1.AirplaneModel({
            model: String(req.body.model),
            numSeats: Number(req.body.numSeats)
        });
        yield newAirplane.save();
        return res.status(200).json({ message: "Airplane added correctly." });
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        return res.status(500).json({ message: error });
    }
});
exports.editAirplane = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        try {
            yield airplane_1.AirplaneModel.findByIdAndUpdate(req.body.id, { model: req.body.model, numSeats: req.body.numSeats }, { new: false, omitUndefined: true });
            // ** See here https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
            // ** for further information about -omitIUndefined- value.
            return res.status(200).json({ message: "Airplane edited correctly." });
        }
        catch (error) {
            console.log(chalk_1.default.redBright(error));
            return res.status(400).json({ message: error });
        }
    }
    else {
        return res.status(422).json({ message: "Unprocessable entity." });
    }
});
exports.deleteSingleAirplane = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield airplane_1.AirplaneModel.findByIdAndDelete(req.params.idAirplane);
        return res.status(200).json({ message: "Airplane deleted." });
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        return res.status(500).json({ message: error });
    }
});
exports.deleteAllAirplanes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield airplane_1.AirplaneModel.deleteMany({});
        return res.status(200).json({ message: "All airplanes deleted." });
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        return res.status(500).json({ message: error });
    }
});
