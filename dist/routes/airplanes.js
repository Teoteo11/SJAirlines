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
const body_parser_1 = __importDefault(require("body-parser"));
const AirplaneController = __importStar(require("../controllers/airplanes"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
// Description: return JSON containing all planes
router.get("/", AirplaneController.getAirplanes);
// Description: return JSON with one airplane, based on _id par
router.get("/:id", AirplaneController.getAirplanes);
// Description: add one airplane 
// ? Body parameters: model, numSeats
router.post("/", AirplaneController.addSingleAirplane);
// Description: update values of a specific airplane
// ? Body parameters: id, model, numSeats 
router.put("/", AirplaneController.editSingleAirplane);
// Description: delete all airplanes
router.delete("/");
// Description: delete single airplane
router.delete("/:id", AirplaneController.deleteSingleAirplane);
module.exports = router;
