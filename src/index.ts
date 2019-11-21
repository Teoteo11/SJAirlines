//Architettura
interface Ticket {
    id_company : Number,
    id_ticket : Number,
    id_flight : Number,
    isChecked : Boolean
}

interface Airplane{
    id : Number,
    model : String,
    num_seats : Number
}

interface User {
    id : Number,
    username : String,
    name : String
    surname : String,
    tickets : Array<Ticket> 
}

interface Flight {
    id : Number,
    departure : String,
    destination : String,
    duration : Number,
    id_airplane : Number
}

interface Route{
    id : Number,
    placeDeparture : String,
    placeDestination : String
}

interface Company{
    id : Number,
    airplanes : Array<Airplane>,
    route : Array<Route>
}