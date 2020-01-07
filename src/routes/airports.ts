import express from "express";
import { AirportModel } from "../model/airport";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.status(200).json(await AirportModel.find());
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const airport = new AirportModel({
      city: req.body.city,
      country: req.body.country,
      name: req.body.name
    });
    await airport.save();
    res.status(200).json(airport);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    return res.status(200).json(await AirportModel.findById(req.params.id));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

export = router;
