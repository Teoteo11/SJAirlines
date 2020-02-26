import { Request, Response } from "express";
import { UserModel, User } from "../model/user";
import { body, param, validationResult, query } from "express-validator";
import { TicketModel } from "../model/ticket";
import { AirplaneModel } from "../model/airplane";
import { CompanyModel } from "../model/company";
import { FlightModel } from "../model/flight";

export const getUsers = async (req: Request, res: Response) => {
  try {
    if (req.query.username) {
      let user = await UserModel.findOne({ name: req.query.name });
      return res.status(200).json(user);
    }

    // if (req.query.username || req.query.name || req.query.surname) {
    //   let user = await UserModel.find({
    //     $or: [
    //       { username: req.query.username },
    //       { name: req.query.name },
    //       { surname: req.query.surname }
    //     ]
    //   });
    //   return res.status(200).json(user);
    // }
    else {
      let users = await UserModel.find();
      return res.status(200).json(users);
    }
  } catch (error) {
    return res.status(400).json({ message: "User not found", error: error });
  }
};

// router.get("/:id", async (req, res) => {
//   try {
//     if (req.params.id) {
//       res.json(await UserModel.findById(req.params.id));
//     }
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
//   return;
// });

export const addUser = async (req: Request, res: Response) => {
  //control of params added

  const userExist = await UserModel.findOne({ username: req.body.username });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Unprocessable entity" });
  }
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  let user = new UserModel({
    username: req.body.username,
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password,
    email: req.body.email,
    tickets: []
  });
  try {
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  if (req.body.name) {
    //{"new" : true} --> allows the update of the value
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    return res.json(user);
  }
  if (req.body.username) {
    if (await UserModel.findOne({ username: req.body.username })) {
      return res.status(400).json({ message: "This username already exists" });
    }
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { username: req.body.username },
      { new: true }
    );
    return res.json(user);
  }
  if (req.body.surname) {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { surname: req.body.surname },
      { new: true }
    );
    return res.json(user);
  }
  return res.status(400).json({ message: "Please,insert the values" });
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOneAndDelete({
      username: req.params.username
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User eliminated :", user });
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
};

export const getTickets = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: "Unprocessable entity" });
    }
    res
      .status(200)
      .json(((await UserModel.findById(req.params.idUser)) as User).tickets);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addTicket = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Unprocessable entity" });
  }
  try {
    const [user, company, flight] = await Promise.all([
      UserModel.findById(req.params.idUser),
      CompanyModel.findOne({ flights: req.body.idFlight }),
      FlightModel.findById(req.body.idFlight).select("-_id idAirplane") as any
    ]);
    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }
    if (!company) {
      return res.status(400).json({ message: "Company not exists" });
    }
    if (!flight) {
      return res.status(400).json({ message: "Flight not exists" });
    }

    let numSeats = ((await AirplaneModel.findById(flight.idAirplane).select(
      "-_id numSeats"
    )) as any).numSeats;
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
      UserModel.updateOne(user, { $push: { tickets: ticket._id } }),
      AirplaneModel.findByIdAndUpdate(flight.idAirplane, {
        numSeats: Number(numSeats) - 1
      })
    ]);
    return res.status(200).json(ticket);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Unprocessable entity" });
  }

  try {
    const user = await UserModel.findById(req.params.Id);
    const ticket = await TicketModel.findByIdAndDelete(req.params.id);
    await UserModel.updateOne(user, { $pull: { ticket: req.params.id } });
    return res.status(200).json({ message: "Ticket deleted", ticket });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
