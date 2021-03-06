import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParse from "body-parser";

import users from "./routes/users";
import tickets from "./routes/tickets";
import companies from "./routes/companies";
import flights from "./routes/flights";
import aiports from "./routes/airports";
import airplanes from "./routes/airplanes";

import login from "./routes/login";
import socketIo from "socket.io";
import cors from 'cors';
import { Airplane } from "./model/airplane";

// var cors = require("cors");

const app = express();
const port = process.env.APP_PORT || 3004;
export const address: string =
  "mongodb+srv://Matteo:simoneaiello@cluster0-tclhz.mongodb.net/SJAirlines?retryWrites=true&w=majority";

app.use(bodyParse.json());

app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Expose-Headers', '*');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use("/airplanes", airplanes);
app.use("/tickets", tickets);
app.use("/companies", companies);
app.use("/users", users);
app.use("/flights", flights);
app.use("/airports", aiports);
app.use("/login", login);

const server = app.listen(port, () => {
  console.log(`🖥  Server running at port ${port}`);
});

let io = socketIo(server);

io.on("connection", (socket: socketIo.Socket & { airplane: Airplane }) => {
  socket.on("disconnect", () => {});

  socket.on("set-airplane", (airplane: Airplane) => {
    socket.airplane = airplane;
  });
});

mongoose
  .connect(address, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("🗄  Database connected");
  })
  .catch(() => {
    console.log("❌  Error connection!");
  });
//ora 4000 prima port

export { io };
module.exports = app;
