import express from "express";
import bodyParser from "body-parser";
import * as AirplaneController from "../controllers/airplanes";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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
router.delete("/",)

// Description: delete single airplane
router.delete("/:id", AirplaneController.deleteSingleAirplane);

export = router;
