import express              from "express"
import bodyParser           from "body-parser";
import { UserModel }        from "./../model/user"
import { TicketModel }      from "./../model/ticket"
import { CompanyModel }     from "../model/company";
import { FlightModel }      from "../model/flight";
import { AirplaneModel }    from "../model/airplane";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get("/:id",async(req,res)=>{
    try{
        const ticket = await TicketModel.findById(req.params.id);
        return res.status(200).json(ticket);
    }
    catch(err){
        return res.status(404).json({message: "Ticket not found"});
    }
});

router.get("/",async(req,res)=>{
    try{
        const allTickets = await TicketModel.find();
        return res.status(200).json(allTickets);
    }
    catch(err){
        return res.status(404).json({message: err});
    }
});

router.post("/",async(req,res)=>{
    if(req.body.idCompany && req.body.idFlight && req.body.idUser){

        const user = await UserModel.findById(req.body.idUser);
        const company = await CompanyModel.findById(req.body.idCompany);
        const flight = await FlightModel.findById(req.body.idFlight);
        const airplane = await AirplaneModel.findOne(Object(flight)["idAirplane"]);

        if(Object(airplane)["numSeats"]===0){
            return res.status(400).json({message:"Airplane full"});
        }

        
        AirplaneModel.updateOne(airplane,{numSeats : Object(airplane)["numSeats"]--});
        const ticket = new TicketModel({
            idCompany: req.body.idCompany,
            idFlight: req.body.idFlight,
            isChecked: false
        });
    
        await ticket.save();
        await UserModel.updateOne(user,{ticket : ticket._id});
        return res.status(200).json(ticket);
    }
    return res.status(400).json({message : "Invalid entry"});
});

router.put("/:id",async(req,res)=>{
    try{
    const ticket = TicketModel.findOneAndUpdate({_id : req.params.id},{isChecked : true});
    return res.status(200).json(ticket);
    }
    catch(err){
        return res.status(404).json({message: err});
    }
});

router.delete("/:id",async(req,res)=>{
    try{
        const ticket = await TicketModel.findOneAndRemove({_id: req.params.id});
        const user = await TicketModel.findOne({ticket:{_id: req.params.id}});
        await UserModel.updateOne(user,{ticket : []});
        return res.status(200).json({message : "Ticket deleted", ticket});
    }
    catch(err){
        return res.status(400).json({message : "Ticket does not exist"});
    }
});

export = router;