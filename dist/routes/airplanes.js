"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
let exampleJSONCompany = [
    {
        name: "Alitalia",
        id: "6",
        airplanes: [{ id: 1, model: "Boeing 566", numSeats: 60 }],
        route: [{ id: 10, placeDeparture: "Catania", placeDestination: "Roma" }],
    },
    {
        name: "EasyJet",
        id: "4",
        airplanes: [{ id: 2, model: "Boeing 787", numSeats: 80 }],
        route: [{ id: 13, placeDeparture: "Milano", placeDestination: "Amsterdam" }],
    }
];
router.post("/companies/:name/airplane", (req, res) => {
});
router.get("/companies/:name/airplanes", (req, res) => {
    //all airplanes of one company
    const company = exampleJSONCompany.find((company) => {
        return company.name === String(req.body.name);
    });
    if (company) {
        res.status(200).json(company.airplanes);
    }
    else {
        res.status(400).json({ message: "Company not found" });
    }
});
