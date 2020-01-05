export interface Ticket {
	_id?: string;
	idCompany: Number;
	idFlight: Number;
	isChecked: Boolean;
}

export interface Airplane {
	_id?: string;
	model: String;
	numSeats: Number;
}

export interface User {
	_id?: string;
	username: String;
	name: String;
	surname: String;
	tickets: Array<Ticket>;
}

export interface Flight {
	_id?: string;
	departure: String;
	destination: String;
	duration: Number;
	idAirplane: Number;
	price: Number;
	checkIn: Date;
	checkOut: Date;
}

export interface Route {
	_id?: String;
	placeDeparture: String;
	placeDestination: String;
}

export interface Company {
	_id?: String;
	name: String;
	airplanes: Array<Airplane>;
	routes: Array<Route>;
	maxAirplanes: Number;
}

export interface Airport {
	id?: String;
	city: String;
	country: String;
	name: String
}
