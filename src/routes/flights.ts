import express from "express";
import bodyParser from "body-parser";
import { FlightModel } from "../model/flight";
import { check, query } from "express-validator";
import { Flight, Airplane } from "../index";
import { AirplaneModel } from "../model/airplane";
import * as FlightsController from "../controllers/flights";

const router = express.Router();

// Description: return JSON containing flight/s
// ? No params: return all flights
// ? Query flight [id]: return single flight filtered by id
router.get("/", FlightsController.getFlights);

// dargli un senso
router.get("/:idAirport/:nSeats", async (req, res) => {
  try {
    if (req.params.idAirport && req.params.nSeats) {
      let flights: Array<Flight>;
      if (req.query.checkOut && req.query.destination) {
        flights = (await FlightModel.find({
          departure: req.params.idAirport,
          checkIn: req.query.checkIn,
          destination: req.query.destination,
          checkOut: req.query.checkOut
        })) as any;
      } else {
        flights = (await FlightModel.find({
          departure: req.params.idAirport,
          checkIn: req.query.checkIn
        })) as any;
      }
      res.status(200).json(
        flights.filter(async flight => {
          const airplane: Airplane = (await AirplaneModel.findById(
            flight.idAirplane
          )) as any;
          if (Number(airplane.numSeats) - Number(req.params.nSeats) < 0) {
            return false;
          } else {
            return true;
          }
        })
      );
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
});

export = router;
