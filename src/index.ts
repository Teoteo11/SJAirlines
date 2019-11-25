export interface Ticket {
    idCompany: Number,
    idTicket: Number,
    idFlight: Number,
    isChecked: Boolean
}

export interface Airplane {
    id: Number,
    model: String,
    numSeats: Number,
}

export interface User {
    id: Number,
    username: String,
    name: String
    surname: String,
    tickets: Array<Ticket>
}

export interface Flight {
    id: Number,
    departure: String,
    destination: String,
    duration: Number,
    idAirplane: Number
}

export interface Route {
    id: Number,
    placeDeparture: String,
    placeDestination: String
}

export interface Company {
    name: String,
    id: Number,
    airplanes: Array<Airplane>,
    routes: Array<Route>,
    maxAirplanes: Number
}