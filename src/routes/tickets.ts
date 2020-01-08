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


// a che serve?? è un doppione
router.get("/flight",async(req,res)=>{
    res.json(await FlightModel.find());
})

//GET
//Output of filtered tickets
router.get("/:id",async(req,res)=>{
    try{
        const ticket = await TicketModel.findById(req.params.id);
        if(!ticket){
            return res.status(404).json({message: "Ticket not found"});
        }
        return res.status(200).json(ticket);
    }
    catch(err){
        return res.status(404).json({message: err});
    }
});

//GET
//Output of all tickets
router.get("/", async(req, res) => {
    try{
        const allTickets = await TicketModel.find();
        return res.status(200).json(allTickets);
    }
    catch(err){
        return res.status(404).json({message: err});
    }
});

//POST
// TODO validazione dei dati tramite express validator
router.post("/", async(req, res) => {
    //control of entered parameters in the body
    if(req.body.idCompany && req.body.idFlight && req.body.idUser){
        try {
            // TODO da parallelizzare
            const user = await UserModel.findById(req.body.idUser);

            if(!user){
                return res.status(400).json({message: "User not exists"});
            }
            const company = await CompanyModel.findById(req.body.idCompany);

            if(!company){
                return res.status(400).json({message: "Company not exists"});
            }
            const idAirplane = await FlightModel.findById(req.body.idFlight).select("idAirplane");

            if(!idAirplane){
                return res.status(400).json({message: "Flight not exists"});
            }
            const numSeats = await AirplaneModel.findById(idAirplane).select("numSeats");
            //console.log("Airplane : ",airplane);
            let number = Number(numSeats);
            console.log("NUMERO AEREI",numSeats);
            if(number === 0){
                return res.status(400).json({message:"Airplane full"});
            }
            const d = AirplaneModel.findByIdAndUpdate(idAirplane,{numSeats : number--},(err,raw)=>{
                console.log(raw);
            });
            
            const ticket = new TicketModel({
                idCompany: req.body.idCompany,
                idFlight: req.body.idFlight,
                isChecked: false
            });
        
            await ticket.save();
            await UserModel.updateOne(user,{$push: {ticket : ticket._id}});
            return res.status(200).json(ticket);
        } catch (err) {
            return res.status(400).json({message : "Error"});
        }
    }
    return res.status(400).json({message : "Invalid entry"});
});

//PUT
//updating of values of ticket
router.put("/:id", async(req, res) => {
    try{
        const ticket = await TicketModel.findOneAndUpdate({_id : req.params.id},{isChecked : true});
        return res.status(200).json(ticket);
    }
    catch(err){
        return res.status(404).json({message: err});
    }
});

//DELETE
//deleting of ticket by id
router.delete("/:id", async(req, res) => {
    try{
        
        const user = await TicketModel.findOne({ticket:req.params.id});
        const ticket = await TicketModel.findByIdAndDelete(req.params.id);
        await UserModel.updateOne(user,{$pull :{ticket : req.body.id}});
        return res.status(200).json({message : "Ticket deleted", ticket});
    }
    catch(err){
        return res.status(400).json({message : "Id ticket is not present"});
    }
});


export = router;