import express from "express";
import { AirportModel } from "../model/airport"
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        return res.status(200).json(await AirportModel.find());
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
});

export = router;
