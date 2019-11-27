"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const airplane_1 = require("./model/airplane");
const flight_1 = require("./model/flight");
const route_1 = require("./model/route");
const company_1 = require("./model/company");
const user_1 = require("./model/user");
const ticket_1 = require("./model/ticket");
const app = express_1.default();
app.use(body_parser_1.default.json());
const address = "mongodb://Gabriele:helloworld@football-shard-00-00-9yxib.mongodb.net:27017,football-shard-00-01-9yxib.mongodb.net:27017,football-shard-00-02-9yxib.mongodb.net:27017/sj-airlines?ssl=true&replicaSet=football-shard-0&authSource=admin&retryWrites=true&w=majority";
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(address, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected successfully!");
    }).catch(error => {
        console.log("Error connection!");
    });
}));
let newAirplan = new airplane_1.AirplaneModel({ model: 'Airbus A340', numSeats: 295 });
newAirplan.save().then(airplaneData => {
    console.log(airplaneData);
    let newRoute = new route_1.RouteModel({ placeDeparture: 'Roma', placeDestination: 'Parigi' });
    newRoute.save().then(routeDat => {
        console.log(routeDat);
        let newCompany = new company_1.CompanyModel({ name: "Air France", airplanes: airplaneData, routes: routeDat, maxAirplanes: 40 });
        newCompany.save().then(companyData => {
            console.log(companyData);
            let newFlight = new flight_1.FlightModel({ departure: 'Roma', destination: 'Parigi', duration: 2, idAirplane: airplaneData });
            newFlight.save().then(flighthDa => {
                console.log(flighthDa);
                let newTicket = new ticket_1.TicketModel({ idCompany: companyData, idFlight: flighthDa, isChecked: false });
                newTicket.save().then(tickethDa => {
                    console.log(tickethDa);
                    let newUser = new user_1.UserModel({ username: 'Aldo-Me', name: 'Aldo', surname: 'Messina', ticket: tickethDa });
                    newUser.save().then(userDa => {
                        console.log(userDa);
                    })
                        .catch(err => console.log(err));
                })
                    .catch(err => console.log(err));
            })
                .catch(err => console.log(err));
        })
            .catch(err => console.log(err));
    })
        .catch(err => console.log(err));
})
    .catch(err => console.log(err));
let newAirpl = new airplane_1.AirplaneModel({ model: 'Boeing 777-200', numSeats: 440 });
newAirpl.save().then(airplaneData => {
    console.log(airplaneData);
    let newRoute = new route_1.RouteModel({ placeDeparture: 'Roma', placeDestination: 'Catania' });
    newRoute.save().then(routeDat => {
        console.log(routeDat);
        let newCompany = new company_1.CompanyModel({ name: "Alitalia", airplanes: airplaneData, routes: routeDat, maxAirplanes: 40 });
        newCompany.save().then(companyData => {
            console.log(companyData);
            let newFlight = new flight_1.FlightModel({ departure: 'Roma', destination: 'Catania', duration: 2, idAirplane: airplaneData });
            newFlight.save().then(flighthDa => {
                console.log(flighthDa);
                let newTicket = new ticket_1.TicketModel({ idCompany: companyData, idFlight: flighthDa, isChecked: false });
                newTicket.save().then(tickethDa => {
                    console.log(tickethDa);
                    let newUser = new user_1.UserModel({ username: 'Lucy-92', name: 'Lucia', surname: 'Torrisi', ticket: tickethDa });
                    newUser.save().then(userDa => {
                        console.log(userDa);
                    })
                        .catch(err => console.log(err));
                })
                    .catch(err => console.log(err));
            })
                .catch(err => console.log(err));
        })
            .catch(err => console.log(err));
    })
        .catch(err => console.log(err));
})
    .catch(err => console.log(err));
let newAirplane = new airplane_1.AirplaneModel({ model: 'Airbus A380-900', numSeats: 900 });
newAirplane.save().then(airplaneData => {
    console.log(airplaneData);
    let newRoute = new route_1.RouteModel({ placeDeparture: 'Roma', placeDestination: 'Berlino' });
    newRoute.save().then(routeDat => {
        console.log(routeDat);
        let newCompany = new company_1.CompanyModel({ name: "Emirates", airplanes: airplaneData, routes: routeDat, maxAirplanes: 40 });
        newCompany.save().then(companyData => {
            console.log(companyData);
            let newFlight = new flight_1.FlightModel({ departure: 'Roma', destination: 'Berlino', duration: 4, idAirplane: airplaneData });
            newFlight.save().then(flighthDa => {
                console.log(flighthDa);
                let newTicket = new ticket_1.TicketModel({ idCompany: companyData, idFlight: flighthDa, isChecked: false });
                newTicket.save().then(tickethDa => {
                    console.log(tickethDa);
                    let newUser = new user_1.UserModel({ username: 'Rex_cor', name: 'Alex', surname: 'Reina', ticket: tickethDa });
                    newUser.save().then(userDa => {
                        console.log(userDa);
                    })
                        .catch(err => console.log(err));
                })
                    .catch(err => console.log(err));
            })
                .catch(err => console.log(err));
        })
            .catch(err => console.log(err));
    })
        .catch(err => console.log(err));
})
    .catch(err => console.log(err));
let newAirpla = new airplane_1.AirplaneModel({ model: 'Boeing 747-8', numSeats: 700 });
newAirpla.save().then(airplaneData => {
    console.log(airplaneData);
    let newRoute = new route_1.RouteModel({ placeDeparture: 'Palermo', placeDestination: 'Torino' });
    newRoute.save().then(routeDat => {
        console.log(routeDat);
        let newCompany = new company_1.CompanyModel({ name: "Lufthansa", airplanes: airplaneData, routes: routeDat, maxAirplanes: 8 });
        newCompany.save().then(companyData => {
            console.log(companyData);
            let newFlight = new flight_1.FlightModel({ departure: 'Palermo', destination: 'Torino', duration: 3, idAirplane: airplaneData });
            newFlight.save().then(flighthDa => {
                console.log(flighthDa);
                let newTicket = new ticket_1.TicketModel({ idCompany: companyData, idFlight: flighthDa, isChecked: false });
                newTicket.save().then(tickethDa => {
                    console.log(tickethDa);
                    let newUser = new user_1.UserModel({ username: 'Mary', name: 'Maria', surname: 'Neri', ticket: tickethDa });
                    newUser.save().then(userDa => {
                        console.log(userDa);
                    })
                        .catch(err => console.log(err));
                })
                    .catch(err => console.log(err));
            })
                .catch(err => console.log(err));
        })
            .catch(err => console.log(err));
    })
        .catch(err => console.log(err));
})
    .catch(err => console.log(err));
