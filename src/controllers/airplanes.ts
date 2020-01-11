import { Request, Response } from "express";
import { AirplaneModel } from "../model/airplane";
import chalk from 'chalk';

export const getAllAirplanes = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await AirplaneModel.find({}));
  } 
  catch (error) {
    console.log(chalk.redBright(error));
    return res.status(500).json({ message: error });
  }
}


export const getAirplaneById = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await AirplaneModel.findById(req.params.id));
  }
  catch (error) { 
    console.log(chalk.redBright(error));
    return res.status(500).json({ message: error });
  }
}


export const addSingleAirplane = async (req: Request, res: Response) => {
  try {
    let newAirplane = new AirplaneModel({
      model: String(req.body.model),
      numSeats: Number(req.body.numSeats) });
      await newAirplane.save();
      return res.status(200).json({ message: "Airplane added correctly." });
    }
  catch (error) {
    console.log(chalk.redBright(error));
    return res.status(500).json({ message: error });
  }
}


// TODO: multi add
// export const addMultiAirplane = async (req: Request, res: Response) => { }


export const editSingleAirplane = async (req: Request, res: Response) => {
  try {
    await AirplaneModel.findByIdAndUpdate(
      req.body.id,
      { model: req.body.model, numSeats: req.body.numSeats },
      { new: false });
    return res.status(200).json({ message: "Airplane edited" });
  } 
  catch (error) {
    console.log(chalk.redBright(error));
    return res.status(400).json({ message: error });
  }
}


export const deleteSingleAirplane = async (req: Request, res: Response) => {
  try {
    await AirplaneModel.findByIdAndDelete(req.params.idAirplane);
    return res.status(200).json({ message: "Airplane deleted" });
  } 
  catch (error) {
    console.log(chalk.redBright(error));
    return res.status(500).json({ message: error });
  }
}


export const deleteAllAirplanes = async (req: Request, res: Response) => {
  try {
    await AirplaneModel.deleteMany({});
    return res.status(200).json({ message: "All airplanes deleted."});
  }
  catch (error) {
    console.log(chalk.redBright(error));
    return res.status(500).json({ message: error });  
  }
}