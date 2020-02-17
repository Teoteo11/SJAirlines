import { Request, Response } from "express";
import { UserModel } from "../model/user";
import { body, param, validationResult, query } from "express-validator";
import chalk from "chalk";

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
