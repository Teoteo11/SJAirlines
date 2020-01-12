import { Request, Response } from "express";
import { CompanyModel } from "../model/company";
import chalk from 'chalk';


export const getCompanies = async(req: Request, res: Response) => {
  try {
    let company: any;

    req.query.id ?
    company = await CompanyModel.findById(req.query.id) :
    company = await CompanyModel.find();

    return res.status(200).json({ company });
  } 
  catch (error) {
      return res.status(500).json({message : error});
  }
}

export const addSingleCompany = 0;
export const addMultiCompanies = 0;
export const editSingleCompany = 0;
export const deleteSingleCompany = 0;
export const deleteAllCompanies = 0;