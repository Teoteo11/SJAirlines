import express from "express"
import bodyParser from "body-parser";
import {Company,Airplane} from "./../index";

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

router.post("/companies/:name/airplane",(req,res) => {
});

router.get( "/companies/:name/airplanes",(req,res)=>{
    //all airplanes of one company
    const company = exampleJSONCompany.find((company)=>{
        return company.name === String(req.body.name);
    });
    if(company){
        res.status(200).json(company.airplanes);
    }
    else{
        res.status(400).json({message : "Company not found"});
    }

});