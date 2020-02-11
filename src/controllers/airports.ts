import { Request, Response } from "express";
import { AirportModel } from "../model/airport";
import chalk from 'chalk';


export const getAirports = async (req: Request, res: Response) => {
  try {
    let airport: any;

    req.query.id ? 
    airport = await AirportModel.findById(req.params.id) :
    airport = await AirportModel.find();

    return res.status(200).json(airport);
  } 
  catch (error) {
    console.log(chalk.redBright(error));
    return res.status(500).json({ message: error });
  }
}


export const addSingleAirport = async (req: Request, res: Response) => {
  try {
    const airport = new AirportModel({
      city: req.body.city,
      country: req.body.country,
      name: req.body.name });
    
    await airport.save();
    res.status(200).json(airport);
  } catch (error) {
    console.log(chalk.redBright(error));
    return res.status(500).json({ message: error });
  }
}


// TODO: multi add
// export const addMultiAirport = async (req: Request, res: Response) => { }


// export const editSingleAirport
// export const deleteSingleAirport
// export const deleteAllAirplanes