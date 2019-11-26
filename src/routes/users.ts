import express, { response } from "express"
import bodyParser from "body-parser";
import { User } from "..";
import { UserModel } from "../model/user";
import { promisify } from "util";

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
        if(req.query.username || req.query.name || req.query.surname) {
            const user = await UserModel.find( { $or: [{ username: req.query.username }, { name: req.query.name }, { surname: req.query.surname }]});
            return res.json(user);
        }
        const users = await UserModel.find();
        return res.status(201).json(users);
    }
    catch(err){
        return res.status(400).json({message : "User not found"});
    }
});

router.put("/:id", async(req,res) => {
    if(req.body.name) {
        UserModel.findOneAndUpdate({ _id: req.params.id}, {name: req.body.name}, (err, doc, user) => {
            console.log(doc);
            return res.json(doc);
        });
    }
    if(req.body.username) {
        UserModel.findOneAndUpdate({ _id: req.params.id}, {username: req.body.username}, (err, doc, user) => {
            console.log(doc);
            return res.json(doc);
        });
    }
    if(req.body.surname) {
        UserModel.findOneAndUpdate({ _id: req.params.id}, {surname: req.body.surname}, (err, doc, user) => {
            console.log(doc);
            return res.json(doc);
        });
    }
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