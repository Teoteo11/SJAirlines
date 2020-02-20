import { Request, Response } from "express";
import { Flight, FlightModel } from "../model/flight";
import { Airplane, AirplaneModel } from "../model/airplane";
import { validationResult } from "express-validator";
import moment from "moment";
import { format } from "path";

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
    let query = req.query;
    Object.keys(query).forEach(
      key => key !== "destination" && key !== "departure" && delete query[key]
    );
    if (req.query.checkIn) {
      const checkIn = moment(
        new Date(Number(req.query.checkIn)).toLocaleString(),
        "YYYY-MM-DDTHH:mm:ssZ"
      );
      flights = ((await FlightModel.find({
        departure: req.params.departure,
        ...query,
        checkIn: {
          $gte: checkIn.startOf("date").toString(),
          $lte: checkIn.endOf("date").toString()
        }
      })) as any) as Array<Flight>;
    } else {
      flights = ((await FlightModel.find({
        departure: req.params.departure,
        ...query
      })) as any) as Array<Flight>;
    }

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
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
