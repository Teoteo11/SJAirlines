import express from "express";
import tickets from "./tickets/tickets"
const app = express();

app.use("/tickets",tickets);

app.listen(5000,function(){
    console.log("SERVER RUNNING");
});

