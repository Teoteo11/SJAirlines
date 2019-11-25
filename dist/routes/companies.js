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
const company_1 = require("../model/company");
const companies_1 = __importDefault(require("./companies"));
const router = express_1.default.Router();
router.use("/", companies_1.default);
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
// POST - insert company
// read all params from req.body
// check existance of company:
//  - if already exist, 400
//  - if not, add the company, 200
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controlCompany = company_1.CompanyModel.findOne({ name: req.body.name });
    try {
        if (!controlCompany) {
            let company = new company_1.CompanyModel({
                name: String(req.body.name),
                airplanes: Array(req.body.airplanes),
                routes: Array(req.body.route),
                maxAirplanes: Number(req.body.maxAirplanes),
            });
            yield company.save();
            return res.status(200).json({ message: "Company added" });
        }
    }
    catch (error) {
        return res.status(400).json({ message: "Company already exists" });
    }
}));
// GET - find company
// with query
// - if filters, get 1 company by name OR no companies if does not exist
// - if no filters, get all companies
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.name) {
            const companyByName = yield company_1.CompanyModel.findOne({ name: req.query.name });
            return res.status(200).json(companyByName);
        }
        else {
            const allCompany = yield company_1.CompanyModel.find();
            return res.status(200).json(allCompany);
        }
    }
    catch (err) {
        return res.status(400).json({ message: "Company not found" });
    }
}));
//router.put("/:name",async(req,res) => {});
router.delete("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyByName = yield company_1.CompanyModel.findOneAndRemove({ name: req.params.name });
        return res.status(200).json({ message: "Company eliminated :", companyByName });
    }
    catch (error) {
        return res.status(404).json({ message: "Company not found" });
    }
}));
module.exports = router;
