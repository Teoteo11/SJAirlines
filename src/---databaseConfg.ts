import express from "express";
import mongoose from "mongoose";
import bodyParse from "body-parser";

const app = express();
app.use(bodyParse.json());

const address = "mongodb://Gabriele:helloworld@football-shard-00-00-9yxib.mongodb.net:27017,football-shard-00-01-9yxib.mongodb.net:27017,football-shard-00-02-9yxib.mongodb.net:27017/sj-airlines?ssl=true&replicaSet=football-shard-0&authSource=admin&retryWrites=true&w=majority"

app.listen(3000, async () => {
    await mongoose.connect(address, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected successfully!")
    }).catch(error => {
        console.log("Error connection!")
    });
})
