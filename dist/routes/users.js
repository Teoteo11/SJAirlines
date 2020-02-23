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
const UserController = __importStar(require("../controllers/users"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
// Description: return JSON containing all users
router.get("/", UserController.getUsers);
router.get("/:idUser/tickets", [express_validator_1.param("idUser").isMongoId()], UserController.getTickets);
// TODO: validazione tramite express validator
// ? Body parameters: username, name, surname
router.post("/", [
    express_validator_1.body("username")
        .isString()
        .notEmpty(),
    express_validator_1.body("name")
        .isString()
        .notEmpty(),
    express_validator_1.body("surname")
        .isString()
        .notEmpty(),
    express_validator_1.body("password")
        .isString()
        .notEmpty(),
    express_validator_1.body("email")
        .isEmail()
        .notEmpty()
], UserController.addUser);
router.post("/:idUser/ticket", [express_validator_1.param("idUser").isMongoId(), express_validator_1.body("idFlight").isMongoId()], UserController.addTicket);
// Description: update values of a single user
// ? Body parameters:
router.put("/", UserController.updateUser);
// Description: delete single user by username
router.delete("/:username", UserController.deleteUser);
router.delete("/:idUser/ticket/:idTicket", [express_validator_1.param("idUser").isMongoId(), express_validator_1.param("idTicket").isMongoId()], UserController.deleteTicket);
module.exports = router;
