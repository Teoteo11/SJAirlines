import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import { FlightModel } from "../model/flight";


export const getFlights = async (req: Request, res: Response) => {
  if (req.query.id) {
    try {
      const flight = await FlightModel.findById(req.query.id);
      return res.status(200).json(flight);
    } 
    catch (error) {
      return res.status(500).json({ message: error });
    }
  } else {
    try {
      const flights = await FlightModel.find();
      return res.status(200).json(flights);
    } 
    catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
