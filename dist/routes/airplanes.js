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
const express_validator_1 = require("express-validator");
const auth_1 = require("../auth/auth");
const AirplaneController = __importStar(require("../controllers/airplanes"));
const app_1 = require("./../app");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
// Description: return JSON containing all planes
router.get('/', AirplaneController.getAirplanes);
// Description: add one airplane
// ? Body parameters: airplane [ model ], airplane max number of seats [ numSeats ]
router.post('/', [
    // TODO: check id ->
    // Quando passiamo l'id a mongoose, lui crea l'oggetto con l'id dato da noi nel campo _id
    // o crea un campo apposito con nome id? (credo la 1°)
    express_validator_1.body("id")
        .isMongoId()
        .optional(),
    express_validator_1.body("model")
        .isNumeric()
        .notEmpty(),
    express_validator_1.body("numSeats")
        .isNumeric()
        .notEmpty()
], auth_1.auth, AirplaneController.addAirplane);
// Description: update values of a specific airplane
// ? Body parameters: airplane [ id ], airplane [ model ], airplane max number of seats [ numSeats ]
router.put('/', [
    express_validator_1.body("_id")
        .isMongoId()
        .notEmpty(),
    express_validator_1.body("model")
        .isString()
        .optional(),
    express_validator_1.body("numSeats")
        .isNumeric()
        .optional()
], auth_1.auth, AirplaneController.editAirplane, () => {
    app_1.io.emit("airplane-changed", {
        event: "changed in the database"
    });
    return;
});
// Description: delete all airplanes
router.delete('/', auth_1.auth, AirplaneController.deleteAllAirplanes);
// Description: delete single airplane by id
// ? URL parameters: airplane [ id ]
router.delete('/:id', [express_validator_1.param('id').isMongoId()], AirplaneController.deleteSingleAirplane);
module.exports = router;
