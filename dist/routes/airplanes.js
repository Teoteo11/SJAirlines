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
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controlModel = airplane_1.AirplaneModel.findOne(req.body.model);
    try {
        if (!controlModel) {
            let airplane = new airplane_1.AirplaneModel({
                model: String(req.body.model),
                numSeats: Number(req.body.numSeats),
            });
            yield airplane.save();
            //salva l'aereo nella compagnia (scelta da te)
            return res.status(200).json({ message: "Airplane added" });
        }
    }
    catch (error) {
        return res.status(400).json({ message: "Airplane already exists" });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //all airplanes of one company
    try {
        const allAirplane = yield airplane_1.AirplaneModel.find();
        return res.status(200).json(allAirplane);
    }
    catch (error) {
        return res.status(404).json({ message: "there's an error" });
    }
}));
//router.put("/:model",(req,res) => {});
router.delete("/:model", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controlModel = airplane_1.AirplaneModel.findOne(req.params.model);
    try {
        if (!controlModel) {
            return res.status(404).json({ message: "Airplane not found" });
        }
        else {
            const airplaneModel = yield airplane_1.AirplaneModel.findOneAndRemove({ model: req.params.model });
            const eliminateID = Object(airplaneModel)["_id"];
            airplane_1.AirplaneModel.remove({ _id: eliminateID });
            return res.status(200).json({ message: "Company eliminated :", airplaneModel });
        }
    }
    catch (error) {
        return res.status(400).json({ message: "There's an error" });
    }
}));
module.exports = router;
