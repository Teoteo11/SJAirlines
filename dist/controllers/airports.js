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
const airport_1 = require("../model/airport");
const chalk_1 = __importDefault(require("chalk"));
exports.getAirports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let airport;
        req.query.id
            ? (airport = yield airport_1.AirportModel.findById(req.params.id))
            : (airport = yield airport_1.AirportModel.find());
        return res.status(200).json(airport);
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        return res.status(500).json({ message: error });
    }
});
exports.addSingleAirport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const airport = new airport_1.AirportModel({
            city: req.body.city,
            country: req.body.country,
            name: req.body.name
        });
        yield airport.save();
        res.status(200).json(airport);
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        return res.status(500).json({ message: error });
    }
});
// TODO: multi add
// export const addMultiAirport = async (req: Request, res: Response) => { }
// export const editSingleAirport
// export const deleteSingleAirport
// export const deleteAllAirplanes
