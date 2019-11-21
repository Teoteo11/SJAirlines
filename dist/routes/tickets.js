"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
let exampleJSON = [{ "id": 1, "tickets": [{ id_company: 1, id_ticket: 1, id_flight: 1, isChecked: false }] }];
let exampleJSON3 = [{ id_company: 1, id_ticket: 1, id_flight: 1, isChecked: false }];
let exampleJSON2 = [{ "id": 1, "airplanes": [{ "id": 2, "model": "dsdssd", "num_seats": 50 }] }];
router.post("/", (req, res) => {
    if (Number(req.body.id_company) && Number(req.body.id_flight) && Number(req.body.UserId)) {
        //getAllcompany()
        const company = exampleJSON2.find((company) => {
            return company.id === Number(req.body.id_company);
        });
        if (company) {
            let airplane = company.airplanes.find((airplane) => {
                return req.body.id_flight === airplane.id;
            });
            if (airplane) {
                //getAllUser
                const user = exampleJSON.find((user) => {
                    return user.id === req.body.UserId;
                });
                if (user) {
                    if (airplane.num_seats !== 0) {
                        airplane.num_seats--;
                        let ticket = {
                            id_company: Number(req.body.id_company),
                            id_ticket: 1,
                            id_flight: Number(req.body.id_flight),
                            isChecked: false
                        };
                        //addTicketInUser
                        user.tickets.push(JSON.parse(JSON.stringify(ticket)));
                        return res.status(200).json(ticket);
                    }
                    return res.status(400).json({ message: "Airplane full" });
                }
                return res.status(400).json({ message: "User does not exist" });
            }
            return res.status(400).json({ message: "Airplane does not exist" });
        }
        return res.status(400).json({ message: "Company does not exist" });
    }
    return res.status(400).json({ message: "Invalid entry" });
});
router.get("/", (req, res) => {
    //getAllTicket
    res.status(200).json(exampleJSON);
});
router.get("/:id", (req, res) => {
    //getAllTicket
    const ticket = exampleJSON.find((ticket) => {
        return ticket.id === Number(req.params.id);
    });
    if (ticket) {
        return res.status(200).json(ticket);
    }
    return res.status(404).json({ message: "Ticket not found" });
});
router.put("/:id", (req, res) => {
    //getAllUser
    const user = exampleJSON.find((user) => {
        return user.id === req.body.UserId;
    });
    if (user) {
        let result = user.tickets.find((ticket) => {
            if (ticket.id_ticket === Number(req.params.id)) {
                ticket.isChecked = true;
                return true;
            }
            return false;
        });
        if (result) {
            return res.json(result);
        }
        return res.status(404).json({ message: "Ticket does not exist" });
    }
});
router.delete("/:id", (req, res) => {
    let result = exampleJSON3.find((ticket) => {
        if (ticket.id_ticket === Number(req.params.id)) {
            return true;
        }
        return false;
    });
    if (result) {
        return res.json(result);
    }
    return res.status(404).json({ message: "Ticket not found" });
});
module.exports = router;
