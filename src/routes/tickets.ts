import express from "express";
import bodyParser from "body-parser";
import { body, query, param } from "express-validator";
import * as TicketController from "../controllers/tickets";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Description: return JSON containing all tickets
router.get(
  "/",
  [query("id").isMongoId(), query("email").isEmail()],
  TicketController.getTickets
);

// Description: return JSOn containing one ticket by ID
router.get('/:id', 
  [
    param('id').isMongoId().notEmpty()
  ], 
  TicketController.getTicket);

// Description: add new ticket
// ? Body params:
router.post(
  "/",
  [body("idFlight").isMongoId(), body("idUser").isMongoId()],
  TicketController.addSingleTicket
);

// Description: update single ticket
// ? Body params:
router.put(
  "/:id",
  [param("id").isMongoId()],
  TicketController.editSingleTicket
);

// Description: delete one ticket by id
router.delete(
  "/:id",
  [param("id").isMongoId()],
  TicketController.deleteSingleTicket
);

export = router;
