import supertest            from 'supertest';
import app                  from '../app';
import { Ticket } from '../index'


describe("Resource: tickets | File: src/tickets.ts", () => {

    it("Read: GET | should return all tickets", async() => {
        const tickets = (await supertest(app).get('/tickets').expect(200)).body;
        tickets.array.forEach((element: Ticket) => {
            expect(element).toHaveProperty("_id");
            expect(element).toHaveProperty("idCompany");
            expect(element).toHaveProperty("idFlight");
            expect(element).toHaveProperty("isChecked"); 
        });
    });

    it("Read: GET | should return a single ticket", async() => {

        const tickets = (await supertest(app).get('/tickets').expect(200)).body;
        // TODO verificare che tickets è un array di dimensione maggiore di 1
        const ticket = (await supertest(app).get(`/tickets/${tickets[0]._id}`).expect(200)).body;
        expect(ticket._id).toBeInstanceOf(String);
        expect(ticket.idCompany).toBeInstanceOf(String);
        expect(ticket.idFlight).toBeInstanceOf(String);
        expect(ticket.isChecked).toBeInstanceOf(Boolean);
    });

    // it("Create: POST | should create a ticket", async() => {
            // TODO MANCA CREAZIONE TICKET
    // });
});
