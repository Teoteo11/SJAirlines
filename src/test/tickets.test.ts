import supertest            from 'supertest';
import app                  from '../app';


describe("Resource: companies | File: src/companies.ts", () => {

    it("Read: GET | should return all tickets", async() => {

        const res = await supertest(app).get('/tickets');
        expect(res.status).toEqual(200);
        expect(res.body);
    });

    it("Read: GET | should return a single ticket", async() => {

        const getRequest = await supertest(app).get('/tickets');
        const body = getRequest.body;
        const count = Object.keys(body).length;
        const properties = Object.keys(body);
        const random = Math.floor(Math.random() * count);
        const ticket = body[random];
        // const id = ticket.id;

        const res = await supertest(app).get('/tickets');
        expect(res.status).toEqual(200);
        expect(body).toHaveProperty(properties);
        // expect(body).toHaveProperty("_id");
        // expect(body).toHaveProperty("idCompany");
        // expect(body).toHaveProperty("idFlight");
        // expect(body).toHaveProperty("isChecked");

        expect(ticket.id).toBeInstanceOf(String);
        expect(ticket.idCompany).toBeInstanceOf(String);
        expect(ticket.idFlight).toBeInstanceOf(String);
        expect(ticket.isChecked).toBeInstanceOf(Boolean);
    });

    // it("Create: POST | should create a ticket", async() => {

    // });
});
