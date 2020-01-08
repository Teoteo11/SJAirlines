import express, { response } from "express";
import bodyParser from "body-parser";
import { User } from "..";
import { UserModel } from "../model/user";
import { promisify } from "util";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//POST
//if don't exist    --> added
//else              --> message
// TODO validazione tramite express validator
router.post("/", async (req, res) => {
  //control of params added
  if (
    !Number(req.body.username) &&
    !Number(req.body.name) &&
    !Number(req.body.surname)
  ) {
    const userExist = await UserModel.findOne({ username: req.body.username });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    let user = new UserModel({
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      tickets: []
    });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
  return res.status(400).json({ message: "Invalid entry" });
});

//GET
//output of all users or output filtered users
router.get("/", async (req, res) => {
  try {
    if (req.query.username || req.query.name || req.query.surname) {
      const user = await UserModel.find({
        $or: [
          { username: req.query.username },
          { name: req.query.name },
          { surname: req.query.surname }
        ]
      });
      return res.json(user);
    }
    const users = await UserModel.find();
    return res.status(201).json(users);
  } catch (err) {
    return res.status(400).json({ message: "User not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (req.params.id) {
      res.json(await UserModel.findById(req.params.id));
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
});

//PUT
//updating of values like name,surname or username
router.put("/:id", async (req, res) => {
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
});

//DELETE
//deleting of user by username
router.delete("/:username", async (req, res) => {
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
});

export = router;
