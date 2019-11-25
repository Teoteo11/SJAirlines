import express from "express"
import bodyParser from "body-parser";
import {Company} from "./../index";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

let exampleJSONCompany = [
    {
        name : "Alitalia",
        id : "6",
        airplanes : [{id : 1,model : "Boeing 566",numSeats : 60}],
        route : [{id : 10,placeDeparture : "Catania",placeDestination : "Roma"}], 
    },
    {
        name : "EasyJet",
        id : "4",
        airplanes : [{id : 2,model : "Boeing 787",numSeats : 80}],
        route : [{id : 13,placeDeparture : "Milano",placeDestination : "Amsterdam"}], 
    }
]

// POST - insert company
// read all params from req.body
// check existance of company:
//  - if already exist, 400
//  - if not, add the company, 200
// TODO: set 200 to add company

router.post("/",(req,res) => {
    //se il req.body.name c'è nel json
    const nameCompany = req.body.name
    const controlCompany = nameCompany.find(exampleJSONCompany);
    if(String(nameCompany) && Number(req.body.id) && Array(req.body.airplanes) && Array(req.body.route)){
        if(!controlCompany){
            let company:Company = {
                name: String(req.body.name),
                id : Number(req.body.id),
                airplanes : Array(req.body.airplanes),
                routes : Array(req.body.route)
            };
            exampleJSONCompany.push(JSON.parse(JSON.stringify(company)));
            // adding
        }
        else{
            return res.status(400).json({message:"Company already exists"});
        }
    }
});

// GET - find company
// with query
// - if filters, get 1 company by name OR no companies if does not exist
// - if no filters, get all companies

router.get("/",(req,res) => {

    if(req.query.name){
        const company = exampleJSONCompany.find((company) => { 
            return company.name === String(req.query.name) ; 
        });
        
        if(company){
            return res.status(200).json(company);
        }
        return res.status(404).json({message: "Company not found"});
    } else {
        return res.status(200).json(exampleJSONCompany);
    }
});

router.put("/:name",(req,res) => {
    const company = exampleJSONCompany.find((company)=>{
        return company.name === req.body.name;
    });
    if(company){
        return res.status(404).json({message : "Company already exists"});
    }else{
        exampleJSONCompany.push(req.body.name);
        //comandi di mongo che per usare dovrei usare i suoi metodi ecc..
    }
});

router.delete("/:name",(req,res) => {
    const nameCompany = req.body.name
    const controlCompany = nameCompany.find(exampleJSONCompany);
    if(!controlCompany){
        return res.status(404).json({message : "Company not found"});
    }
    else{
        const index = exampleJSONCompany.indexOf(controlCompany.id, 0);
        if (index > -1) {
            exampleJSONCompany.splice(index, 1);
        }
    }
});

export = router;