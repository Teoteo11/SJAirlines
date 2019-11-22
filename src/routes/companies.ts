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


router.post("/",(req,res)=>{
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
        }
        else{
            return res.status(400).json({message:"Company already exists"});
        }
    }
});

router.get("/",(req,res)=>{
    res.status(200).json(exampleJSONCompany);
    if(req.query.name){
        const company = exampleJSONCompany.find((company)=>{ 
            return company.name === String(req.query.name) ; 
        });
        if(company){
            return res.status(200).json(company);
        }
        return res.status(404).json({message: "Company not found"});
    }
});




export = router;
