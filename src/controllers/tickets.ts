import express, { Request, Response } from "express";
import { validationResult } from "express-validator";

import { TicketModel } from "../model/ticket";
import { AirplaneModel } from "../model/airplane";
import { UserModel } from "../model/user";
import { CompanyModel } from "../model/company";
import { FlightModel } from "../model/flight";

export const getTickets = async (req: Request, res: Response) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: "Unprocessable entity" });
  }

  if (req.query.id || req.query.user) {
    const ticket = await TicketModel.find({$or: [req.query.id, req.query.user]});
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found." });
    } else {
      return res.status(200).json(ticket);
    }
  } else {
    const allTickets = await TicketModel.find();
    if (!allTickets) {
      return res.status(404).json({ message: "No ticket found." });
    } else {
      return res.status(200).json(allTickets);
    }
  }
}


export const addSingleTicket = async (req: express.Request, res: express.Response) => {
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


export const editSingleTicket = async (req: Request, res: Response) => {
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
}


export const deleteSingleTicket = async (req: Request, res: Response) => {
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