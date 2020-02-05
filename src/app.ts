import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParse from "body-parser";

import users from "./routes/users";
import tickets from "./routes/tickets";
import companies from "./routes/companies";
import flights from "./routes/flights";
import aiports from "./routes/airports"
import airplanes from "./routes/airplanes";

import login from "./routes/login";

const app = express();
const port = process.env.APP_PORT || 3003;
export const address:string = 'mongodb+srv://Matteo:simoneaiello@cluster0-tclhz.mongodb.net/SJAirlines?retryWrites=true&w=majority';

app.use(bodyParse.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/airplanes", airplanes);
app.use("/tickets", tickets);
app.use("/companies", companies);
app.use("/users", users);
app.use("/flights", flights);
app.use("/airports", aiports);
app.use("/login", login);

// import prova from './routes/prova';
// app.use('/prova', prova);

if (process.env.NODE_ENV !== "test") { 
  app.listen(port, () => { 
    console.log(`🖥  Server running at port ${port}`);
    dbConnect(); 
  });
}
  
async function dbConnect():Promise<any> {
  return mongoose.connect(address, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log("🗄  Database connected") })
  .catch(() => { console.log("❌  Error connection!") });
}

// app.listen(port, () => {
//     console.log(`🖥  Server running at port ${port}`);
//     app.emit("appStarted");
// });

module.exports = app;