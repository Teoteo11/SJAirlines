import express from "express"
import bodyParser from "body-parser";
import { User } from "..";
import { UserModel } from "../model/user";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post("/", async(req,res) => {
    if(req.body.username && req.body.name && req.body.surname) {
        let user = new UserModel({
            username : req.body.username,
            name : req.body.name,
            surname : req.body.surname,
            tickets : [],
        });
        try {
            await user.save();
            res.status(201).json(user);
        }
        catch(err) {
            res.status(400).json({message : err});
        }
    }
    return res.status(400).json({message : "Invalid entry"});
});

router.get( "/", async(req,res) => {
    try {
        console.log(req.query.username);
        if(req.query.username) {
            const user = await UserModel.find({ username: req.query.username });
            return res.json(user);
        }
        const users = await UserModel.find();
        return res.status(201).json(users);
    }
    catch(err){
        return res.status(400).json({message : "User not found"});
    }
});

router.put("/:username", async(req,res) => {
    const user = await UserModel.find({username : req.params.username});
    if(user) {
        let json = [];
        if(req.body.username) {
            json.push({username: req.body.username});
        }
        if(req.body.name) {
            json.push({name: req.body.name});
        }
        if(req.body.surname) {
            json.push({surname: req.body.surname});
        }

        try {
            await UserModel.updateOne(user, {...json});
            res.status(201).json(user);
        }
        catch(err) {
            res.status(400).json({message : err});
        }
    }
    return res.status(400).json({message : "Invalid entry"});
});

router.delete("/:username", async(req,res) => {
    try {
        const user = await UserModel.findOneAndRemove({username: req.params.username});
        return res.status(200).json({message : "User eliminated :", user});
    } catch (error) {
        return res.status(404).json({message : "User not found"});
    }
});

export = router;