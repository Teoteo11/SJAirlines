import express from "express";
import bodyParser from "body-parser";
import { body, param } from "express-validator";
import * as UserController from "../controllers/users";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Description: return JSON containing all users
router.get("/", UserController.getUsers);

// TODO: validazione tramite express validator
// ? Body parameters: username, name, surname 
router.post("/", 
  [
    body("username").isString().notEmpty(),
    body("name").isString().notEmpty(),
    body("surname").isString().notEmpty()
  ],
    UserController.addUser
  );

// Description: update values of a single user
// ? Body parameters: 
router.put("/", UserController.updateUser);

// Description: delete single user by username
router.delete("/:username", UserController.deleteUser);

export = router;
