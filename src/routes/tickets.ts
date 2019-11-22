import express from "express"
import bodyParser from "body-parser";
import {Ticket, Company} from "./../index"
import { RSA_NO_PADDING } from "constants";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));




let exampleJSON = [{"id" : 1, "tickets": [{idCompany : 1,idTicket : 1,idFlight : 1,isChecked : false}]}];
let exampleJSON3 = [{idCompany : 1,idTicket : 1,idFlight : 1,isChecked : false}] 


let exampleJSON2 = [{"id": 1, "airplanes": [{"id" : 2, "model" : "dsdssd","numSeats" : 50}]}]

router.post("/",(req,res)=>{
    if(Number(req.body.idCompany) && Number(req.body.idFlight) && Number(req.body.UserId)){
        //getAllcompany()
        const company = exampleJSON2.find((company)=>{
            return company.id === Number(req.body.idCompany);
        });
        if(company){
            let airplane = company.airplanes.find((airplane)=>{
                return req.body.idFlight === airplane.id;
            });
            if(airplane){
                //getAllUser
                const user = exampleJSON.find((user)=>{
                    return user.id === req.body.UserId;
                });
                if(user){
                    if(airplane.numSeats !==0){
                        airplane.numSeats--;
                        let ticket:Ticket = {
                            idCompany: Number(req.body.idCompany),
                            idTicket: 1, //generateId()
                            idFlight: Number(req.body.idFlight),
                            isChecked: false
                        };
                        //addTicketInUser
                        user.tickets.push(JSON.parse(JSON.stringify(ticket)));
                        return res.status(200).json(ticket);
                    }
                    return res.status(400).json({message:"Airplane full"});
                }
                return res.status(400).json({message:"User does not exist"});
            }
            return res.status(400).json({message:"Airplane does not exist"});
        }
        return res.status(400).json({message:"Company does not exist"});
    }
    return res.status(400).json({message : "Invalid entry"});
});

router.get("/",(req,res)=>{
    //getAllTicket
    res.status(200).json(exampleJSON);
});

router.get("/:id",(req,res)=>{
    //getAllTicket
    const ticket = exampleJSON.find((ticket)=>{ 
        return ticket.id === Number(req.params.id) ; 
    });
    if(ticket){
        return res.status(200).json(ticket);
    }
    return res.status(404).json({message: "Ticket not found"});
});


router.put("/:id",(req,res)=>{
    //getAllUser
    const user = exampleJSON.find((user)=>{
        return user.id === req.body.UserId;
    });
    if(user){
        let result = user.tickets.find((ticket)=>{
            if(ticket.idTicket === Number(req.params.id)){
                ticket.isChecked = true;
                return true;
            }
            return false; 
        });
        if(result){
            return res.json(result);
        }
        return res.status(404).json({message : "Ticket does not exist"});
    }
});

router.delete("/:id",(req,res)=>{
    let result = exampleJSON3.find((ticket)=>{
        if(ticket.idTicket === Number(req.params.id)){
            
            return true;
        }
        return false; 
    });
    if(result){
        return res.json(result);
    }
    return res.status(404).json({message : "Ticket not found"});
});


export = router;