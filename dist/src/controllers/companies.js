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
const company_1 = require("../model/company");
exports.getCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let company;
        req.query.id ?
            company = yield company_1.CompanyModel.findById(req.query.id) :
            company = yield company_1.CompanyModel.find();
        return res.status(200).json({ company });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.addSingleCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controlCompany = yield company_1.CompanyModel.findOne({ id: req.body.id });
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
        return res.status(500).json({ message: error });
    }
});
// TODO: export const addMultiCompanies;
// TODO: export const editSingleCompany;
// TODO: export const deleteSingleCompany;
// TODO: export const deleteAllCompanies;
