import express from "express";
import tickets from "./routes/tickets"
import companies from "./routes/companies"
import airplanes from "./routes/airplanes"
const app = express();

app.use("/tickets",tickets);
app.use("/companies",companies);
app.use("/airplanes",airplanes);

app.listen(5000,function(){
    console.log("SERVER RUNNING");
});

