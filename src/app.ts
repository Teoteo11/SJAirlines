import express from "express";
import tickets from "./routes/tickets"
import companies from "./routes/companies"
const app = express();

app.use("/tickets",tickets);
app.use("/companies",companies);

app.listen(5000,function(){
    console.log("SERVER RUNNING");
});

