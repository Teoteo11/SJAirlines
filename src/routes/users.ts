import express from "express";
import bodyParser from "body-parser";
import { body, param } from "express-validator";
import * as UserController from "../controllers/users";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Description: return JSON containing all users
router.get("/", UserController.getUsers);
router.get(
  "/:idUser/tickets",
  [param("idUser").isMongoId()],
  UserController.getTickets
);

// TODO: validazione tramite express validator
// ? Body parameters: username, name, surname
router.post(
  "/",
  [
    body("username")
      .isString()
      .notEmpty(),
    body("name")
      .isString()
      .notEmpty(),
    body("surname")
      .isString()
      .notEmpty(),
    body("password")
      .isString()
      .notEmpty(),
    body("email")
      .isEmail()
      .notEmpty()
  ],
  UserController.addUser
);

router.post(
  "/:idUser/ticket",
  [param("idUser").isMongoId(), body("idFlight").isMongoId()],
  UserController.addTicket
);

// Description: update values of a single user
// ? Body parameters:
router.put("/", UserController.updateUser);

// Description: delete single user by username
router.delete("/:username", UserController.deleteUser);
router.delete(
  "/:idUser/ticket/:idTicket",
  [param("idUser").isMongoId(), param("idTicket").isMongoId()],
  UserController.deleteTicket
);

export = router;
