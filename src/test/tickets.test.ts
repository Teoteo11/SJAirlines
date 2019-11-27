import supertest            from 'supertest';
import app                  from '../app';


describe("Resource: tickets | File: src/tickets.ts", () => {

    it("Read: GET | should return all tickets", async() => {

        const res = await supertest(app).get('/tickets');
        const body = res.body;
        const keys = Object.keys(body);
        const count = keys.length;
        const random = Math.floor(Math.random() * count);

        expect(res.status).toEqual(200);
        expect(body[random]).toHaveProperty("_id");
    });

    it("Read: GET | should return a single ticket", async() => {

        const getRequest = await supertest(app).get('/tickets');

        const body = getRequest.body;
        
        const count = Object.keys(body).length;
        const random = Math.floor(Math.random() * count);
        
        const ticket = body[random];
        console.log("ticket is here: ", ticket);
        
        const properties = Object.keys(ticket);

        const res = await supertest(app).get(`/tickets/:${ticket._id}`);

        expect(res.status).toEqual(200);
        expect(body).toHaveProperty(properties);

        expect(ticket._id).toBeInstanceOf(String);
        expect(ticket.idCompany).toBeInstanceOf(String);
        expect(ticket.idFlight).toBeInstanceOf(String);
        expect(ticket.isChecked).toBeInstanceOf(Boolean);
    });

    // it("Create: POST | should create a ticket", async() => {

    // });
});
