import express from "express"
import bodyParser from "body-parser";
import { UserModel } from "./../model/user"
import { TicketModel } from "./../model/ticket"
import { CompanyModel } from "../model/company";
import { FlightModel } from "../model/flight";
import { AirplaneModel } from "../model/airplane";
import { body, param, validationResult } from "express-validator"

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//GET
//Output of all tickets
router.get("/", async (req, res) => {
    try {
        const allTickets = await TicketModel.find();
        return res.status(200).json(allTickets);
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});

//GET
//Output of filtered tickets
router.get("/:id", [
    param("id")
        .isMongoId()
],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Unprocessable entity" });
        }
        try {
            const ticket = await TicketModel.findById(req.params.id);
            if (!ticket) {
                return res.status(404).json({ message: "Ticket not found" });
            }
            return res.status(200).json(ticket);
        }
        catch (err) {
            return res.status(500).json({ message: err });
        }
    }
);

//POST
// TODO validazione dei dati tramite express validator
router.post("/", [
    body("idCompany")
        .isMongoId(),
    body("idFlight")
        .isMongoId(),
    body("idUser")
        .isMongoId()
],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Unprocessable entity" });
        }
        try {
            const [user, company, idAirplane] = await Promise.all([
                UserModel.findById(req.body.idUser),
                CompanyModel.findById(req.body.idCompany),
                FlightModel.findById(req.body.idFlight).select("idAirplane"),
            ])
            if (!user) {
                return res.status(400).json({ message: "User not exists" });
            }
            if (!company) {
                return res.status(400).json({ message: "Company not exists" });
            }
            if (!idAirplane) {
                return res.status(400).json({ message: "Flight not exists" });
            }

            let numSeats = await AirplaneModel.findById(idAirplane).select("numSeats");
            if (Number(numSeats) === 0) {
                return res.status(400).json({ message: "Airplane full" });
            }

            const ticket = new TicketModel({
                idCompany: req.body.idCompany,
                idFlight: req.body.idFlight,
                isChecked: false
            });

            await Promise.all([
                ticket.save(),
                UserModel.updateOne(user, { $push: { ticket: ticket._id } }),
                AirplaneModel.findByIdAndUpdate(idAirplane, { numSeats: Number(numSeats) - 1 })
            ]);
            return res.status(200).json(ticket);
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }
);

//PUT
//updating of values of ticket
router.put("/:id", [
    param("id")
        .isMongoId()
],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Unprocessable entity" });
        }

        try {
            let ticket = await TicketModel.findByIdAndUpdate(req.params.id, { isChecked: true }, { new: true });
            if (!ticket) {
                return res.status(404).json({ message: "Ticket not found" });
            }
            return res.status(200).json(ticket);
        }
        catch (err) {
            return res.status(500).json({ message: err });
        }
    });

//DELETE
//deleting of ticket by id
router.delete("/:id", [
    param("id")
        .isMongoId()
],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Unprocessable entity" });
        }

        try {
            const user = await UserModel.findOne({ tickets: req.params.id });
            const ticket = await TicketModel.findByIdAndDelete(req.params.id);
            await UserModel.updateOne(user, { $pull: { ticket: req.body.id } });
            return res.status(200).json({ message: "Ticket deleted", ticket });
        }
        catch (err) {
            return res.status(500).json({ message: err });
        }
    }
);


export = router;