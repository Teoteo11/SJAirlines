export interface Ticket {
    idCompany: Number,
    idFlight: Number,
    isChecked: Boolean
}

export interface Airplane {
    model: String,
    numSeats: Number,
}

export interface User {
    username: String,
    name: String
    surname: String,
    tickets: Array<Ticket>
}

export interface Flight {
    departure: String,
    destination: String,
    duration: Number,
    idAirplane: Number
}

export interface Route {
    placeDeparture: String,
    placeDestination: String
}

export interface Company {
    name: String,
    airplanes: Array<Airplane>,
    routes: Array<Route>,
    maxAirplanes: Number
}