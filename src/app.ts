import express from "express";
import mongoose from "mongoose";
import bodyParse from "body-parser";
import company from "./routes/companies"
import ticket from "./routes/tickets"
import user from "./routes/users"
import airplane from "./routes/airplanes"

const app = express();
app.use(bodyParse.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use("/companies", company);
app.use("/users", user);
app.use("/tickets", ticket);
app.use("/airplanes",airplane)

const address = "mongodb://Gabriele:helloworld@football-shard-00-00-9yxib.mongodb.net:27017,football-shard-00-01-9yxib.mongodb.net:27017,football-shard-00-02-9yxib.mongodb.net:27017/sj-airlines?ssl=true&replicaSet=football-shard-0&authSource=admin&retryWrites=true&w=majority"

app.listen(5000, async () => {
    await mongoose.connect(address, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected successfully!")
    }).catch(error => {
        console.log("Error connection!")
    });
})
