// import express from "express";
// import mongoose from "mongoose";
// import bodyParse from "body-parser";
// import { AirplaneModel } from "./model/airplane"
// import { FlightModel } from "./model/flight"
// import { RouteModel } from "./model/route"
// import { CompanyModel } from "./model/company"
// import { UserModel } from "./model/user"
// import { TicketModel } from "./model/ticket"

// const app = express();
// app.use(bodyParse.json());

// const address = "mongodb://Gabriele:helloworld@football-shard-00-00-9yxib.mongodb.net:27017,football-shard-00-01-9yxib.mongodb.net:27017,football-shard-00-02-9yxib.mongodb.net:27017/sj-airlines?ssl=true&replicaSet=football-shard-0&authSource=admin&retryWrites=true&w=majority"

// app.listen(3000, async () => {
//     await mongoose.connect(address, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(() => {
//         console.log("Connected successfully!")
//     }).catch(error => {
//         console.log("Error connection!")
//     });
// })

// let newAirplan = new AirplaneModel({ model: 'Airbus A340', numSeats: 295 });
// newAirplan.save().then(airplaneData => {
//     console.log(airplaneData);
//     let newRoute = new RouteModel({ placeDeparture: 'Roma', placeDestination: 'Parigi' });
//     newRoute.save().then(routeDat => {
//         console.log(routeDat);
//         let newCompany = new CompanyModel({ name: "Air France", airplanes: airplaneData, routes: routeDat, maxAirplanes: 40 });
//         newCompany.save().then(companyData => {
//             console.log(companyData);
//             let newFlight = new FlightModel({ departure: 'Roma', destination: 'Parigi', duration: 2, idAirplane: airplaneData });
//             newFlight.save().then(flighthDa => {
//                 console.log(flighthDa);
//                 let newTicket = new TicketModel({ idCompany: companyData, idFlight: flighthDa, isChecked: false });
//                 newTicket.save().then(tickethDa => {
//                     console.log(tickethDa);
//                     let newUser = new UserModel({ username: 'Aldo-Me', name: 'Aldo', surname: 'Messina', ticket: tickethDa });
//                     newUser.save().then(userDa => {
//                         console.log(userDa);
//                     })
//                         .catch(err => console.log(err));
//                 })
//                     .catch(err => console.log(err));
//             })
//                 .catch(err => console.log(err));
//         })
//             .catch(err => console.log(err));
//     })
//         .catch(err => console.log(err));
// })
//     .catch(err => console.log(err));

// let newAirpl = new AirplaneModel({ model: 'Boeing 777-200', numSeats: 440 });
// newAirpl.save().then(airplaneData => {
//     console.log(airplaneData);
//     let newRoute = new RouteModel({ placeDeparture: 'Roma', placeDestination: 'Catania' });
//     newRoute.save().then(routeDat => {
//         console.log(routeDat);
//         let newCompany = new CompanyModel({ name: "Alitalia", airplanes: airplaneData, routes: routeDat, maxAirplanes: 40 });
//         newCompany.save().then(companyData => {
//             console.log(companyData);
//             let newFlight = new FlightModel({ departure: 'Roma', destination: 'Catania', duration: 2, idAirplane: airplaneData });
//             newFlight.save().then(flighthDa => {
//                 console.log(flighthDa);
//                 let newTicket = new TicketModel({ idCompany: companyData, idFlight: flighthDa, isChecked: false });
//                 newTicket.save().then(tickethDa => {
//                     console.log(tickethDa);
//                     let newUser = new UserModel({ username: 'Lucy-92', name: 'Lucia', surname: 'Torrisi', ticket: tickethDa });
//                     newUser.save().then(userDa => {
//                         console.log(userDa);
//                     })
//                         .catch(err => console.log(err));
//                 })
//                     .catch(err => console.log(err));
//             })
//                 .catch(err => console.log(err));
//         })
//             .catch(err => console.log(err));
//     })
//         .catch(err => console.log(err));
// })
//     .catch(err => console.log(err));

// let newAirplane = new AirplaneModel({ model: 'Airbus A380-900', numSeats: 900 });
// newAirplane.save().then(airplaneData => {
//     console.log(airplaneData);
//     let newRoute = new RouteModel({ placeDeparture: 'Roma', placeDestination: 'Berlino' });
//     newRoute.save().then(routeDat => {
//         console.log(routeDat);
//         let newCompany = new CompanyModel({ name: "Emirates", airplanes: airplaneData, routes: routeDat, maxAirplanes: 40 });
//         newCompany.save().then(companyData => {
//             console.log(companyData);
//             let newFlight = new FlightModel({ departure: 'Roma', destination: 'Berlino', duration: 4, idAirplane: airplaneData });
//             newFlight.save().then(flighthDa => {
//                 console.log(flighthDa);
//                 let newTicket = new TicketModel({ idCompany: companyData, idFlight: flighthDa, isChecked: false });
//                 newTicket.save().then(tickethDa => {
//                     console.log(tickethDa);
//                     let newUser = new UserModel({ username: 'Rex_cor', name: 'Alex', surname: 'Reina', ticket: tickethDa });
//                     newUser.save().then(userDa => {
//                         console.log(userDa);
//                     })
//                         .catch(err => console.log(err));
//                 })
//                     .catch(err => console.log(err));
//             })
//                 .catch(err => console.log(err));
//         })
//             .catch(err => console.log(err));
//     })
//         .catch(err => console.log(err));
// })
//     .catch(err => console.log(err));

// let newAirpla = new AirplaneModel({ model: 'Boeing 747-8', numSeats: 700 });
// newAirpla.save().then(airplaneData => {
//     console.log(airplaneData);
//     let newRoute = new RouteModel({ placeDeparture: 'Palermo', placeDestination: 'Torino' });
//     newRoute.save().then(routeDat => {
//         console.log(routeDat);
//         let newCompany = new CompanyModel({ name: "Lufthansa", airplanes: airplaneData, routes: routeDat, maxAirplanes: 8 });
//         newCompany.save().then(companyData => {
//             console.log(companyData);
//             let newFlight = new FlightModel({ departure: 'Palermo', destination: 'Torino', duration: 3, idAirplane: airplaneData });
//             newFlight.save().then(flighthDa => {
//                 console.log(flighthDa);
//                 let newTicket = new TicketModel({ idCompany: companyData, idFlight: flighthDa, isChecked: false });
//                 newTicket.save().then(tickethDa => {
//                     console.log(tickethDa);
//                     let newUser = new UserModel({ username: 'Mary', name: 'Maria', surname: 'Neri', ticket: tickethDa });
//                     newUser.save().then(userDa => {
//                         console.log(userDa);
//                     })
//                         .catch(err => console.log(err));
//                 })
//                     .catch(err => console.log(err));
//             })
//                 .catch(err => console.log(err));
//         })
//             .catch(err => console.log(err));
//     })
//         .catch(err => console.log(err));
// })
//     .catch(err => console.log(err));
