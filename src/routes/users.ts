import express from "express"
import bodyParser from "body-parser";
import { User } from "..";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

let exampleJSONUsers = [
    {
        id : 1,
        username : "PincoPallo",
        name : "Joe",
        surname : "Pallino",
        tickets : [
            {
                id_company : 1,
                id_ticket : 1,
                id_flight : 1,
                isChecked : false
            }
        ]
    },
    {
        id : 2,
        username : "CiaoBella",
        name : "Spaco",
        surname : "Botiglia",
        tickets : [
            {
                id_company : 1,
                id_ticket : 2,
                id_flight : 2,
                isChecked : false
            }
        ]
    }
]

router.post("/",(req,res) => {
    if(req.body.id, req.body.username && req.body.name && req.body.surname && req.body.tickets) {
        const user = exampleJSONUsers.find((user) => {
            return user.username === req.body.username;
        });
        if(!user) {
            let user : User = {
                id : Number(req.body.id),
                username : req.body.username,
                name : req.body.name,
                surname : req.body.surname,
                tickets : Array(req.body.tickets),
            };
            exampleJSONUsers.push(JSON.parse(JSON.stringify(user)));
            return true;
        }
        return res.status(400).json({message:"User already exists"});
    }
    return res.status(400).json({message : "Invalid entry"});
});

router.get( "/",(req,res) => {
    const user = exampleJSONUsers.find((user) => {
        return user.name === String(req.query.name);
    });
    if(user) {

    }
    else {
        res.status(400).json({message : "User not found"});
    }
});

router.put("/:username",(req,res) => {
    const user = exampleJSONUsers.find((user) => {
        return user.username === req.body.username;
    });
    if(user) {
        return res.status(404).json({message : "User already exists"});
    }
    else {
        let user = {
            username : req.body.username,
            name : req.body.name
        };
        exampleJSONUsers.push(JSON.parse(JSON.stringify(user)));
        return true;
    }
});

router.delete("/:username",(req,res) => {
    const user = exampleJSONUsers.find((user) => {
        return user.username === req.body.username;
    });
    if(user) {
        
    }
    else {
        return res.status(404).json({message : "User not found"});
    }
});
/* C: POST -> accounts/create
R: GET -> accounts/:username (? filter queries: by name, by surname, ...)
U: PUT -> accounts/:username
D: DELETE -> accounts/:username */

export = router;