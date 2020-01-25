import express from "express";
import bodyParser from "body-parser";
import * as LoginController from "../controllers/login";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Description: user login with authentication
// ? Body params: [PAYLOAD]
router.post("/", LoginController.userLogin);
export = router;