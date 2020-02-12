import express from "express";
import { param, query } from "express-validator";
import * as FlightsController from "../controllers/flights";

const router = express.Router();

// Description: return JSON containing flight/s
// ? No params: return all flights
// ? Query flight [id]: return single flight filtered by id
router.get("/", [query("id").isMongoId()], FlightsController.getFlights);

// dargli un senso
router.get(
  "/:departure/:destination/:nSeats",
  [
    param(["departure", "destination"]).isMongoId(),
    param("nSeats").isNumeric(),
    query(["checkOut", "checkIn"])
      .optional()
      .isNumeric()
  ],
  FlightsController.getFilteredFlights
);

export = router;
