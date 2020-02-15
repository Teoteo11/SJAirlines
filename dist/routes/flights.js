"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const FlightsController = __importStar(require("../controllers/flights"));
const router = express_1.default.Router();
// Description: return JSON containing flight/s
// ? No params: return all flights
// ? Query flight [id]: return single flight filtered by id
router.get("/", [express_validator_1.query("id").isMongoId()], FlightsController.getFlights);
// dargli un senso
router.get("/:departure/:destination/:nSeats", [
    express_validator_1.param(["departure", "destination"]).isMongoId(),
    express_validator_1.param("nSeats").isNumeric(),
    express_validator_1.query(["checkOut", "checkIn"])
        .optional()
        .isISO8601()
], FlightsController.getFilteredFlights);
module.exports = router;
