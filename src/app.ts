import express      from "express";
import mongoose     from "mongoose";
import bodyParse    from "body-parser";

import users        from "./routes/users";
import tickets      from "./routes/tickets";
import companies    from './routes/companies';
import airplanes    from "./routes/airplanes";

const app           = express();
const port          = process.env.PORT || 3000;
const address       = "mongodb://Gabriele:helloworld@football-shard-00-00-9yxib.mongodb.net:27017,football-shard-00-01-9yxib.mongodb.net:27017,football-shard-00-02-9yxib.mongodb.net:27017/sj-airlines?ssl=true&replicaSet=football-shard-0&authSource=admin&retryWrites=true&w=majority"

app.use(bodyParse.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use ("/airplanes",   airplanes);
app.use ("/tickets",     tickets);
app.use ("/companies",   companies);
app.use ("/users",       users);

app.listen(port, () => {
    mongoose.connect(address, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected successfully!");
    }).catch(error => {
        console.log("Error connection!");
    });
})

export = app;