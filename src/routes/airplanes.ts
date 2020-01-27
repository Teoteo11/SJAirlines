import express from 'express';
import bodyParser from 'body-parser';
import { body, param } from 'express-validator';
import * as AirplaneController from '../controllers/airplanes';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Description: return JSON containing all planes
router.get("/", AirplaneController.getAirplanes);

// Description: add one airplane 
// ? Body parameters: airplane [ model ], airplane max number of seats [ numSeats ]
router.post("/", 
  [
    // TODO: check id ->
    // Quando passiamo l'id a mongoose, lui crea l'oggetto con l'id dato da noi nel campo _id
    // o crea un campo apposito con nome id? (credo la 1°)
    body('id').isMongoId().optional(),
    body('model').isNumeric().notEmpty(),
    body('numSeats').isNumeric().notEmpty()
  ], 
    AirplaneController.addAirplane
  );

// Description: update values of a specific airplane
// ? Body parameters: airplane [ id ], airplane [ model ], airplane max number of seats [ numSeats ]
router.put("/", 
  [
    body('id').isMongoId().notEmpty(),
    body('model').isNumeric().optional(),
    body('numSeats').isNumeric().optional()
  ], 
    AirplaneController.editAirplane
  );

// Description: delete all airplanes
router.delete("/", AirplaneController.deleteAllAirplanes);

// Description: delete single airplane by id
// ? URL parameters: airplane [ id ]
router.delete("/:id", 
  [
    param('id').isMongoId()
  ], 
    AirplaneController.deleteSingleAirplane
  );

export = router;