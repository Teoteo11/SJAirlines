import { Request, Response } from "express";
import { AirportModel } from "../model/airport";
import chalk from 'chalk';
import { CompanyModel } from "../model/company";


export const getSingleCompany = async(req: Request, res: Response) => {
  try {
      return res.status(200).json(await CompanyModel.findById(req.params.id));
  } catch (error) {
      return res.status(500).json({message : error});
  }
}


export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await CompanyModel.find({}));
  }
  catch (error) {
    console.log(chalk.redBright(error));
    return res.status(500).json({ message: error });
  }
}

export const addSingleCompany = 0;
export const addMultiCompanies = 0;
export const editSingleCompany = 0;
export const deleteSingleCompany = 0;
export const deleteAllCompanies = 0;