import express from "express";
import mongoose from "mongoose";
import bodyParse from "body-parser";
import airplaneRouter from "./routes/airplanes"
import { AirplaneModel } from "./model/airplane"
import { FlightModel } from "./model/flight"
import { RouteModel } from "./model/route"
import { CompanyModel } from "./model/company"
import { UserModel } from "./model/user"
import { TicketModel } from "./model/ticket"

const app = express();
app.use(bodyParse.json());

const address = "mongodb://Gabriele:helloworld@football-shard-00-00-9yxib.mongodb.net:27017,football-shard-00-01-9yxib.mongodb.net:27017,football-shard-00-02-9yxib.mongodb.net:27017/sj-airlines?ssl=true&replicaSet=football-shard-0&authSource=admin&retryWrites=true&w=majority"

app.listen(300, async () => {
    await mongoose.connect(address, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected successfully!")
    }).catch(error => {
        console.log("Error connection!")
    });
})
const flyghtTest = new FlightModel({
    departure: "Mosca",
    destination: "MAlta",
    duration: 4,
})
flyghtTest.save();

const airplaneTests = new AirplaneModel({
    model: "Mov",
    numSeats: 120
});

airplaneTests.save();

let newAirplane = new AirplaneModel({ model: 'Airbus A340', numSeats: 295 });
newAirplane.save().then(airplaneData => {
    console.log(airplaneData);
    let newRoute = new RouteModel({ placeDeparture: 'Roma', placeDestination: 'Parigi' });
    newRoute.save().then(routeDat => {
        console.log(routeDat);
        let newCompany = new CompanyModel({ name: "Air France", airplanes: airplaneData, routes: routeDat });
        newCompany.save().then(companyData => {
            console.log(companyData);
            let newFlight = new FlightModel({ departure: 'Roma', destination: 'Parigi', duration: 2, idAirplane: airplaneData });
            newFlight.save().then(flighthDa => {
                console.log(flighthDa);
                let newTicket = new TicketModel({ idCompany: companyData, idFlight: flighthDa, isChecked: false });
                newTicket.save().then(tickethDa => {
                    console.log(tickethDa);
                    let newUser = new UserModel({ username: 'Aldo-Me', name: 'Aldo', surname: 'Messina', ticket: tickethDa });
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


let newAirpla = new AirplaneModel({ model: 'Boeing 777-200', numSeats: 440 });
newAirpla.save().then(airplaneData => {
    console.log(airplaneData);
    let newRoute = new RouteModel({ placeDeparture: 'Roma', placeDestination: 'Catania' });
    newRoute.save().then(routeDat => {
        console.log(routeDat);
        let newCompany = new CompanyModel({ name: "Alitalia", airplanes: airplaneData, routes: routeDat });
        newCompany.save().then(companyData => {
            console.log(companyData);
            let newFlight = new FlightModel({ departure: 'Roma', destination: 'Catania', duration: 2, idAirplane: airplaneData });
            newFlight.save().then(flighthDa => {
                console.log(flighthDa);
                let newTicket = new TicketModel({ idCompany: companyData, idFlight: flighthDa, isChecked: false });
                newTicket.save().then(tickethDa => {
                    console.log(tickethDa);
                    let newUser = new UserModel({ username: 'Lucy-92', name: 'Lucia', surname: 'Torrisi', ticket: tickethDa });
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

const flyghtTest2 = new FlightModel({
    departure: "Londra",
    destination: "Roma",
    duration: 6,
    id_airplane: 1
})
flyghtTest2.save();

const airplaneTests2 = new AirplaneModel({
    model: "Vitt-66",
    num_seat: 80
});

airplaneTests2.save();

UserModel.findOne({ name: "Gabriele" }).then(data => {
    console.log(data);
    if (data === null) {
        throw new Error("User not found");
    }
}).catch(err => {
    console.log(err);
})
AirplaneModel.findOne({ model: "Boeing 777-200" }).then(data => {
    console.log(data);
    if (data === null) {
        throw new Error("Airplane not found");
    }
}).catch(err => {
    console.log(err);
})
AirplaneModel.findOne({ model: "Flex" }).then(data => {
    console.log(data);
    if (data === null) {
        throw new Error("Airplane not found");
    }
}).catch(err => {
    console.log(err);
})



