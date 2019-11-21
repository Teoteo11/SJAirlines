//Architettura
export interface Ticket {
    id_company : Number,
    id_ticket : Number,
    id_flight : Number,
    isChecked : Boolean
}

export interface Airplane{
    id : Number,
    model : String,
    num_seats : Number
}

export interface User {
    id : Number,
    username : String,
    name : String
    surname : String,
    tickets : Array<Ticket> 
}

export interface Flight {
    id : Number,
    departure : String,
    destination : String,
    duration : Number,
    id_airplane : Number
}

export interface Route{
    id : Number,
    placeDeparture : String,
    placeDestination : String
}

export interface Company{
    id : Number,
    airplanes : Array<Airplane>,
    route : Array<Route>
}