import express from "express"
import bodyParser from "body-parser";
import {Company,Airplane} from "./../index";
import { CompanyModel } from "../model/company";
import airplane from "./airplanes"

const router = express.Router();
router.use("/", airplane);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// POST - insert company
// read all params from req.body
// check existance of company:
//  - if already exist, 400
//  - if not, add the company, 200
router.post("/",async(req,res) => {
    const controlCompany = CompanyModel.findOne({name : req.body.name});
    try {
        if(!controlCompany) {
            let company = new CompanyModel ({
                name : String(req.body.name),
                airplanes : Array(req.body.airplanes),
                routes : Array(req.body.route),
                maxAirplanes : Number(req.body.maxAirplanes),
            });
            await company.save();
            return res.status(200).json({message : "Company added"});
        }
    } catch (error) {
        return res.status(400).json({message:"Company already exists"});
       }
});

// GET - find company
// with query
// - if filters, get 1 company by name OR no companies if does not exist
// - if no filters, get all companies
router.get("/",async(req,res) => {
   try {
       if(req.query.name){
           const companyByName = await CompanyModel.findOne({name : req.query.name});
           return res.status(200).json(companyByName);
       }
       else{
           const allCompany = await CompanyModel.find();
           return res.status(200).json(allCompany);
       }
   } catch (err) {
       return res.status(400).json({message : "Company not found"});
   }
});

//router.put("/:name",async(req,res) => {});

router.delete("/:name",async(req,res) => {
    try {
        const companyByName = await CompanyModel.findOneAndRemove({name : req.params.name});
        return res.status(200).json({message : "Company eliminated :",companyByName});
    } catch (error) {
        return res.status(404).json({message : "Company not found"})
    }
});

export = router;