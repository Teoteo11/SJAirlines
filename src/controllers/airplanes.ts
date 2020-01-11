import { Request, Response } from "express";
import { AirplaneModel } from "../model/airplane";
import { CompanyModel } from "../model/company";

export const addAirplane = async (req:Request, res:Response) => {
  if (!Number(req.body.model) && Number(req.body.numSeats)) {
    try {
      const company = await CompanyModel.findById(req.params.id);
      if (company) {
        let airplane = new AirplaneModel({
          model: String(req.body.model),
          numSeats: Number(req.body.numSeats)
        });
        await airplane.save();
        await CompanyModel.updateOne(company, {
          $push: { airplanes: airplane._id }
        });
        return res.status(200).json({ message: "Airplane added" });
      }
      return res.status(404).json({ message: "Company not found" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
  return res.status(404).json({ message: "Invalid entry" });
}

export const getPlaneById = async(req:Request, res:Response) => {
  //all airplanes of one company
  try {
    const idAirplanes = await CompanyModel.findById(req.params.id).select("airplanes");
    let airplanes = [];
    for (let id of Object(idAirplanes)["airplanes"]) {
      airplanes.push(await AirplaneModel.findById(id));
    }
    return res.status(200).json(airplanes);
  } catch (error) {
    return res.status(404).json({ message: "there's an error" });
  }
}

export const getAllPlanes = async(res:Response) => {
    const planes = await AirplaneModel.find();
    res.status(200).json({...planes});
}
 