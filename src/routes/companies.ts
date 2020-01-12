import express, { Request, Response } from "express"
import bodyParser from "body-parser";
import { CompanyModel } from "../model/company";
import * as CompanyController from "../controllers/companies"

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", CompanyController.getCompanies);

// POST - insert company
// read all params from req.body
// check existance of company:
//  - if already exist, 400
//  - if not, add the company, 200
// TODO validazione dei dati tramite express validator
router.post("/", CompanyController.addSingleCompany);

//PUT
//updating of values 
router.put("/:name", async(req,res) => {
    const user = await CompanyModel.findOneAndUpdate({name: req.params.name},{name : req.body.name},{"new":true});
    return user ? res.json(user) : res.status(404).json({message : "Company not found"});
    
});

//DELETE
//deleting of company by name
router.delete("/:name",async(req,res) => {
    try {
        const companyByName = await CompanyModel.findOneAndRemove({name : req.params.name});
        return companyByName ? res.status(200).json({message : "Company eliminated :",companyByName}) : res.status(404).json({message : "Company not found"});
    } catch (error) {
        return res.status(404).json({message : "Company not found"})
    }
});

export = router;