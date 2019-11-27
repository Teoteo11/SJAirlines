import express              from "express"
import bodyParser           from "body-parser";
import airplanes            from "./airplanes";
import { CompanyModel }     from "../model/company";
import { Company }          from "../index"


const router = express.Router();
router.use('/', airplanes);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// GET - find company
// with query
// - if filters, get 1 company by name OR no companies if does not exist
// - if no filters, get all companies
router.get("/", async(req, res) => {
    try {
        const allCompany =  await CompanyModel.find();
        const companies = allCompany.map((company: any) => {
            return {
                name: company.name,
                _id: company._id
            }
        })
        return res.status(200).json(companies);
    } catch (err) {
        return res.status(404).json({message : "Company not found"});
    }
});

router.get("/:name", async(req, res) => {
    try {
        const companyByName = await CompanyModel.findOne({name : req.params.name});
        return companyByName ? res.status(200).json(companyByName) : res.status(404).json({message: "Company not found"});
    } catch (err) {
        return res.status(404).json({message : "Company not found"});
    }
});

// POST - insert company
// read all params from req.body
// check existance of company:
//  - if already exist, 400
//  - if not, add the company, 200
router.post("/", async(req, res) => {

    // console.log("POST companies was called");

    const controlCompany = await CompanyModel.findOne({name : req.body.name});
    
    //console.log("\n\n\n\n control company object");
    //console.log(controlCompany);

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
        } else {
            return res.status(400).json({message:"Company already exists"});
        }
    } catch (error) {
        return res.status(404).json({message: error});
       }
});

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