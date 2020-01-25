import express, { Response } from "express";
import bodyParser from "body-parser";
import * as UserController from "../controllers/users";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//POST
//if don't exist    --> added
//else              --> message

// Description: return JSON containing all users
router.get("/", UserController.getUsers);

// TODO: validazione tramite express validator
router.post("/", UserController.addUser);

//PUT
//updating of values like name,surname or username
router.put("/", UserController.updateUser);

//DELETE
//deleting of user by username
router.delete("/", UserController.deleteUser);

export = router;
