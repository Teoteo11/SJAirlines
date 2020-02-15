import { Request, Response, NextFunction } from "express";
import { AirplaneModel } from "../model/airplane";
import { validationResult } from "express-validator";

import chalk from "chalk";

export const getAirplanes = async (req: Request, res: Response) => {
  try {
    let airplane: any;

    req.query.id
      ? (airplane = await AirplaneModel.findById(req.query.id))
      : (airplane = await AirplaneModel.find());

    return res.status(200).json(airplane);
  } catch (error) {
    console.log(chalk.redBright(error));
    return res.status(500).json({ message: error });
  }
};

export const addAirplane = async (req: Request, res: Response) => {
  try {
    let newAirplane = new AirplaneModel({
      model: String(req.body.model),
      numSeats: Number(req.body.numSeats)
    });
    await newAirplane.save();
    return res.status(201).json({ message: "Airplane added correctly." });
  } catch (error) {
    console.log(chalk.redBright(error));
    return res.status(500).json({ message: error });
  }
};

export const editAirplane = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      await AirplaneModel.findByIdAndUpdate(
        req.body.id,
        { model: req.body.model, numSeats: req.body.numSeats },
        { new: false, omitUndefined: true }
      );

      // ** See here https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
      // ** for further information about -omitIUndefined- value.

      res.status(200).json({ message: "Airplane edited correctly." });
      return next();
    } catch (error) {
      console.log(chalk.redBright(error));
      return res.status(400).json({ message: error });
    }
  } else {
    return res.status(422).json({ message: "Unprocessable entity." });
  }
};

export const deleteSingleAirplane = async (req: Request, res: Response) => {
  try {
    await AirplaneModel.findByIdAndDelete(req.params.idAirplane);
    return res.status(200).json({ message: "Airplane deleted." });
  } catch (error) {
    console.log(chalk.redBright(error));
    return res.status(500).json({ message: error });
  }
};

export const deleteAllAirplanes = async (req: Request, res: Response) => {
  try {
    await AirplaneModel.deleteMany({});
    return res.status(200).json({ message: "All airplanes deleted." });
  } catch (error) {
    console.log(chalk.redBright(error));
    return res.status(500).json({ message: error });
  }
};
