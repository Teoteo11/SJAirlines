import { Request, Response } from "express";
import { CompanyModel } from "../model/company";


export const getCompanies = async(req: Request, res: Response) => {
  try {
    let company: any;

    req.query.id ?
    company = await CompanyModel.findById(req.query.id) :
    company = await CompanyModel.find();

    return res.status(200).json({ company });
  } 
  catch (error) {
      return res.status(500).json({ message: error });
  }
}


export const addSingleCompany = async(req: Request, res: Response) => {

  const controlCompany = await CompanyModel.findOne({ id: req.body.id });

  try {
      if(!controlCompany) {

          let company = new CompanyModel ({
              name: String(req.body.name),
              airplanes: Array(req.body.airplanes),
              routes: Array(req.body.route),
              maxAirplanes: Number(req.body.maxAirplanes),
          });

          await company.save();
          return res.status(200).json({ message: "Company added" });
      } else {
          return res.status(400).json({ message: "Company already exists" });
      }
  } 
  catch (error) {
      return res.status(500).json({ message: error });
  }
}

// TODO: export const addMultiCompanies;
// TODO: export const editSingleCompany;
// TODO: export const deleteSingleCompany;
// TODO: export const deleteAllCompanies;