import express from "express"
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

class Ticket {
    static counter = 0;

    constructor(public id_company : Number, public id_ticket : Number, public id_flight : Number, public isChecked : Boolean){

    }
}

let exampleJSON = {"tickets" : Array<Object>()}; 
exampleJSON = Object(exampleJSON);

router.post("/",(async(req,res)=>{
    if(Number(req.body.id_company) && Number(req.body.id_flight)){
        let ticket = new Ticket(req.body.id_company,Ticket.counter++,req.body.id_flight,false);
        Object(exampleJSON)["tickets"].push(JSON.parse(JSON.stringify(ticket)));
        res.status(200).json(ticket);
        console.log(exampleJSON);
        return;
    }
    res.status(400).json({message : ""})
}));

router.get("/",(async(req,res)=>{
    res.status(200).json(exampleJSON);
}));

router.get("/:id",(async(req,res)=>{
    res.json(exampleJSON.tickets.find((ticket:Object)=>{ 
        return Object(ticket)["id_ticket"] === Number(req.params.id) ; 
    }));
    return;
}));


router.put("/:id", (async(req,res)=>{
    let result = exampleJSON.tickets.find((ticket:Object)=>{
        if(Object(ticket)["id_ticket"] === Number(req.params.id)){
            Object(ticket)["isChecked"] = true;
            return true;
        }
        return false; 
    })
    if(result){
        return res.json(result);
    }
    return res.status(404).json({message : "Ticket not found"});
}));

router.delete("/:id",(async(req,res)=>{
    let result = exampleJSON.tickets.find((ticket:Object)=>{
        if(Object(ticket)["id_ticket"] === Number(req.params.id)){
            const index = exampleJSON.tickets.indexOf(ticket);
            exampleJSON.tickets.splice(index,1);
            return true;
        }
        return false; 
    })
    if(result){
        return await res.json(result);
    }
    return await res.status(404).json({message : "Ticket not found"});
}));


export = router;