import express from "express";
import bodyParser from "body-parser";
import * as AirportController from "../controllers/airports";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Description: return JSON with all airports
router.get("/", AirportController.getAirports);

// Description: return JSON with one airport
router.get("/:id", AirportController.getAirports);

// Description:
// ? Body params:
router.post("/", AirportController.addSingleAirport);

// router.put()
// router.delete()

export = router;