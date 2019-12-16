import express from "express";
import bodyParser from "body-parser";
import { FlightModel } from "../model/flight"
const router = express.Router();

router.get("/", async (req, res) => {
    return res.json(await FlightModel.find());
});

router.get("/:id", async (req, res) => {
    try {
        if (req.params.id) {
            res.json(await FlightModel.findById(req.params.id));
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
    return;
});

export = router;