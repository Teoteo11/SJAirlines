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
const airplanes_1 = __importDefault(require("./airplanes"));
const company_1 = require("../model/company");
const router = express_1.default.Router();
router.use('/', airplanes_1.default);
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
// GET - find company
// with query
// - if filters, get 1 company by name OR no companies if does not exist
// - if no filters, get all companies
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCompany = yield company_1.CompanyModel.find();
        const companies = allCompany.map((company) => {
            return {
                name: company.name,
                _id: company._id
            };
        });
        return res.status(200).json(companies);
    }
    catch (err) {
        return res.status(404).json({ message: "Company not found" });
    }
}));
router.get("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyByName = yield company_1.CompanyModel.findOne({ name: req.params.name });
        return companyByName ? res.status(200).json(companyByName) : res.status(404).json({ message: "Company not found" });
    }
    catch (err) {
        return res.status(404).json({ message: "Company not found" });
    }
}));
// POST - insert company
// read all params from req.body
// check existance of company:
//  - if already exist, 400
//  - if not, add the company, 200
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("POST companies was called");
    const controlCompany = yield company_1.CompanyModel.findOne({ name: req.body.name });
    //console.log("\n\n\n\n control company object");
    //console.log(controlCompany);
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
        else {
            return res.status(400).json({ message: "Company already exists" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error });
    }
}));
//PUT
//updating of values 
router.put("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield company_1.CompanyModel.findOneAndUpdate({ name: req.params.name }, { name: req.body.name }, { "new": true });
    return user ? res.json(user) : res.status(404).json({ message: "Company not found" });
}));
//DELETE
//deleting of company by name
router.delete("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyByName = yield company_1.CompanyModel.findOneAndRemove({ name: req.params.name });
        return companyByName ? res.status(200).json({ message: "Company eliminated :", companyByName }) : res.status(404).json({ message: "Company not found" });
    }
    catch (error) {
        return res.status(404).json({ message: "Company not found" });
    }
}));
module.exports = router;
