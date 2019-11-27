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
const airplane_1 = require("../model/airplane");
const company_1 = require("../model/company");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
//POST
//add airplane with id airplane like params 
router.post("/:id/plane", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Number(req.body.model) && Number(req.body.numSeats)) {
        try {
            const company = yield company_1.CompanyModel.findById(req.params.id);
            if (company) {
                let airplane = new airplane_1.AirplaneModel({
                    model: String(req.body.model),
                    numSeats: Number(req.body.numSeats),
                });
                yield airplane.save();
                yield company_1.CompanyModel.updateOne(company, { $push: { airplanes: airplane._id } });
                return res.status(200).json({ message: "Airplane added" });
            }
            return res.status(404).json({ message: "Company not found" });
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }
    return res.status(404).json({ message: "Invalid entry" });
}));
//GET
//output -->all airplane of one company (id company )
router.get("/:id/planes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
//PUT
//updating of values of specific airplane of  specific company
router.put("/:id/plane/:idAirplane", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.model && req.params.idAirplane) {
        try {
            const company = yield company_1.CompanyModel.findOne({ _id: req.params.id, airplanes: req.params.idAirplane });
            const airplane = yield airplane_1.AirplaneModel.findByIdAndUpdate(req.params.idAirplane, { model: req.body.model }, { "new": true });
            return res.json({ message: "Airplane edited", airplane });
        }
        catch (err) {
            return res.status(400).json({ message: "Id Airplane is not present" });
        }
    }
    return res.status(400).json({ message: "Invalid entry" });
}));
//DELETE
//deleting of airplane of specific company with id
router.delete("/:id/plane/:idAirplane", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield company_1.CompanyModel.findOneAndUpdate({ _id: req.params.id, airplanes: req.params.idAirplane }, { $pull: { airplanes: req.params.idAirplane } }, { "new": true });
        const airplane = yield airplane_1.AirplaneModel.findByIdAndDelete(req.params.idAirplane);
        return res.status(200).json({ message: "Airplane deleted", airplane });
    }
    catch (err) {
        return res.status(400).json({ message: "Id Airplane is not present" });
    }
}));
module.exports = router;
