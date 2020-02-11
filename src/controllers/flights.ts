import { Request, Response } from "express";
import { Flight, FlightModel } from "../model/flight";
import { Airplane, AirplaneModel } from "../model/airplane";
import { validationResult } from "express-validator";

export const getFlights = async (req: Request, res: Response) => {
  if (req.query.id) {
    try {
      const flight = await FlightModel.findById(req.query.id);
      return res.status(200).json(flight);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  } else {
    try {
      const flights = await FlightModel.find();
      return res.status(200).json(flights);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
};

export const getFilteredFlights = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Unprocessable entity" });
  }
  try {
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
      flights = flights.filter(async flight => {
        const airplane: Airplane = (await AirplaneModel.findById(
          flight.idAirplane
        )) as any;
        if (Number(airplane.numSeats) - Number(req.params.nSeats) < 0) {
          return false;
        } else {
          return true;
        }
      });
      return res.status(200).json(flights);
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
