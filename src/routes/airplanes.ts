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
        maxAirplanes : "20",
    },
    {
        name : "EasyJet",
        id : "4",
        airplanes : [{id : 2,model : "Boeing 787",numSeats : 80}],
        route : [{id : 13,placeDeparture : "Milano",placeDestination : "Amsterdam"}],
        maxAirplanes : "20",
    }
]

router.post("/",(req,res) => {
    const model = req.body.model
    const controlModel = model.find(exampleJSONCompany);
    if(!controlModel){
            let airplane:Airplane = {
                id: Number(req.body.id),
                model : String(req.body.model),
                numSeats : Number(req.body.numSeats),
            };
            exampleJSONCompany.push(JSON.parse(JSON.stringify(airplane)));
        }
        else{
            return res.status(400).json({message:"Airplane already exists"});
        }
    
});

router.get( "/",(req,res) => {
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

router.put("/:model",(req,res) => {
    const airplane = exampleJSONCompany.find((airplane)=>{
       for(let i = 0; i < airplane.airplanes.length; i++){
           return airplane.airplanes[i].model === req.params.model
       }
    });
    if(!airplane){
        return res.status(404).json({message : "Airplane not exists"});
    }else{
        exampleJSONCompany.push(req.body.model);
    }
});

router.delete("/:model",(req,res) => {
    //se l'id è autogenerato,attualmente passiamo il modello..poi l'id
    const modelAirplane = req.body.model
    const controlAirplane = modelAirplane.find(exampleJSONCompany);
    if(!controlAirplane){
        return res.status(404).json({message : "Airplane not found"});
    }
    else{
        const index = exampleJSONCompany.indexOf(controlAirplane.id, 0);
        if (index > -1) {
            exampleJSONCompany.splice(index, 1);
        }
    }
});

export = router;