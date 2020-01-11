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
const airplane_1 = require("../model/airplane");
const company_1 = require("../model/company");
exports.addAirplane = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Number(req.body.model) && Number(req.body.numSeats)) {
        try {
            const company = yield company_1.CompanyModel.findById(req.params.id);
            if (company) {
                let airplane = new airplane_1.AirplaneModel({
                    model: String(req.body.model),
                    numSeats: Number(req.body.numSeats)
                });
                yield airplane.save();
                yield company_1.CompanyModel.updateOne(company, {
                    $push: { airplanes: airplane._id }
                });
                return res.status(200).json({ message: "Airplane added" });
            }
            return res.status(404).json({ message: "Company not found" });
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }
    return res.status(404).json({ message: "Invalid entry" });
});
exports.getPlaneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //all airplanes of one company
    try {
        const idAirplanes = yield company_1.CompanyModel.findById(req.params.id).select("airplanes");
        let airplanes = [];
        for (let id of Object(idAirplanes)["airplanes"]) {
            airplanes.push(yield airplane_1.AirplaneModel.findById(id));
        }
        return res.status(200).json(airplanes);
    }
    catch (error) {
        return res.status(404).json({ message: "there's an error" });
    }
});
exports.getAllPlanes = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const planes = yield airplane_1.AirplaneModel.find()
        .then(planeList => res.status(200).json(Object.assign({}, planeList)))
        .catch(err => {
        return res.status(500).json({ message: `There could be an internal server error or either the servers are offline. Please try again in a few minutes.<br />Error description: ${err}` });
    });
});
