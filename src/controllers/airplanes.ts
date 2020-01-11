import { Request, Response } from "express";
import { AirplaneModel } from "../model/airplane";


export const getAllPlanes = async (req: Request, res: Response) => {
  try {
    const planes = await AirplaneModel.find();
    return res.status(200).json( {...planes} );
  } 
  catch (error) {
      return res.status(500).json( {message: "Something gone wrong.", error} );
  }
}


export const getPlaneById = async (req: Request, res: Response) => {
  try {
    if (req.body._id) {
      const plane = await AirplaneModel.findById(req.body._id);
      return res.status(200).json( {...plane} );
    } else {
      return res.status(400).json( {message: "Parameter _id missing."} );
    }
  }
  catch (error) {
    return res.status(500).json( {message: "", error} );
  }
}


// export const addAirplane = async (req:Request, res:Response) => {
//   if (!Number(req.body.model) && Number(req.body.numSeats)) {
//     try {
//       const company = await CompanyModel.findById(req.params.id);
//       if (company) {
//         let airplane = new AirplaneModel({
//           model: String(req.body.model),
//           numSeats: Number(req.body.numSeats)
//         });
//         await airplane.save();
//         await CompanyModel.updateOne(company, {
//           $push: { airplanes: airplane._id }
//         });
//         return res.status(200).json({ message: "Airplane added" });
//       }
//       return res.status(404).json({ message: "Company not found" });
//     } catch (error) {
//       return res.status(400).json({ message: error });
//     }
//   }
//   return res.status(404).json({ message: "Invalid entry" });
// }


 