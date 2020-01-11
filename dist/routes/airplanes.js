"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import { CompanyModel } from "../model/company";
const airplanes_1 = require("../controllers/airplanes");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
// Description: return JSON containing all planes
router.get("/", airplanes_1.getAllPlanes);
// Description: return JSON with one airplane, based on _id par
router.get("/:id", airplanes_1.getPlaneById);
module.exports = router;
