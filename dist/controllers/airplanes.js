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
exports.getAllPlanes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planes = yield airplane_1.AirplaneModel.find();
        return res.status(200).json(Object.assign({}, planes));
    }
    catch (error) {
        return res.status(500).json({ message: "Something gone wrong.", error });
    }
});
exports.getPlaneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body._id) {
            const plane = yield airplane_1.AirplaneModel.findById(req.body._id);
            return res.status(200).json(Object.assign({}, plane));
        }
        else {
            return res.status(400).json({ message: "Parameter _id missing." });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "", error });
    }
});
// export const addAirplane = async (req:Request, res:Response) => {
//   if (!Number(req.body.model) && Number(req.body.numSeats)) {
//     try {
//       const company = await CompanyModel.findById(req.params.id);
//       if (company) {
//         let airplane = new AirplaneModel({
//           model: String(req.body.model),
//           numSeats: Number(req.body.numSeats)
//         });
//         await airplane.save();
//         await CompanyModel.updateOne(company, {
//           $push: { airplanes: airplane._id }
//         });
//         return res.status(200).json({ message: "Airplane added" });
//       }
//       return res.status(404).json({ message: "Company not found" });
//     } catch (error) {
//       return res.status(400).json({ message: error });
//     }
//   }
//   return res.status(404).json({ message: "Invalid entry" });
// }
