import express from "express";
import bodyParser from "body-parser";
import { AirplaneModel } from "../model/airplane";
import { CompanyModel } from "../model/company";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//POST
//add airplane with id airplane like params
router.post("/:id/plane", async (req, res) => {
  if (!Number(req.body.model) && Number(req.body.numSeats)) {
    try {
      const company = await CompanyModel.findById(req.params.id);
      if (company) {
        let airplane = new AirplaneModel({
          model: String(req.body.model),
          numSeats: Number(req.body.numSeats)
        });
        await airplane.save();
        await CompanyModel.updateOne(company, {
          $push: { airplanes: airplane._id }
        });
        return res.status(200).json({ message: "Airplane added" });
      }
      return res.status(404).json({ message: "Company not found" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
  return res.status(404).json({ message: "Invalid entry" });
});

//GET
//output -->all airplane of one company (id company )
router.get("/:id/planes", async (req, res) => {
  //all airplanes of one company
  try {
    const idAirplanes = await CompanyModel.findById(req.params.id).select(
      "airplanes"
    );
    let airplanes = [];
    for (let id of Object(idAirplanes)["airplanes"]) {
      airplanes.push(await AirplaneModel.findById(id));
    }
    return res.status(200).json(airplanes);
  } catch (error) {
    return res.status(404).json({ message: "there's an error" });
  }
});

//PUT
//updating of values of specific airplane of  specific company
router.put("/:id/plane/:idAirplane", async (req, res) => {
  if (req.body.model && req.params.idAirplane) {
    try {
      const company = await CompanyModel.findOne({
        _id: req.params.id,
        airplanes: req.params.idAirplane
      });
      const airplane = await AirplaneModel.findByIdAndUpdate(
        req.params.idAirplane,
        { model: req.body.model },
        { new: true }
      );
      return res.json({ message: "Airplane edited", airplane });
    } catch (err) {
      return res.status(400).json({ message: "Id Airplane is not present" });
    }
  }
  return res.status(400).json({ message: "Invalid entry" });
});

//DELETE
//deleting of airplane of specific company with id
router.delete("/:id/plane/:idAirplane", async (req, res) => {
  try {
    const company = await CompanyModel.findOneAndUpdate(
      { _id: req.params.id, airplanes: req.params.idAirplane },
      { $pull: { airplanes: req.params.idAirplane } },
      { new: true }
    );
    const airplane = await AirplaneModel.findByIdAndDelete(
      req.params.idAirplane
    );
    return res.status(200).json({ message: "Airplane deleted", airplane });
  } catch (err) {
    return res.status(400).json({ message: "Id Airplane is not present" });
  }
});

export = router;
