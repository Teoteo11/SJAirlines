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
const TicketController = __importStar(require("../controllers/tickets"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
// Description: return JSON containing all tickets
router.get("/", [express_validator_1.query("id").isMongoId(), express_validator_1.query("email").isEmail()], TicketController.getTickets);
// Description: return JSOn containing one ticket by ID
router.get('/:id', [
    express_validator_1.param('id').isMongoId().notEmpty()
], TicketController.getTicket);
// Description: add new ticket
// ? Body params:
router.post("/", [express_validator_1.body("idFlight").isMongoId(), express_validator_1.body("idUser").isMongoId()], TicketController.addSingleTicket);
// Description: update single ticket
// ? Body params:
router.put("/:id", [express_validator_1.param("id").isMongoId()], TicketController.editSingleTicket);
// Description: delete one ticket by id
router.delete("/:id", [express_validator_1.param("id").isMongoId()], TicketController.deleteSingleTicket);
module.exports = router;
