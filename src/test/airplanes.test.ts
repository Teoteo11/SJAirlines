import supertest            from 'supertest';
import app                  from '../app';

describe("Resource: companies | File: src/companies.ts", () => {

    it("Read: GET | should return all airplanes of one company", async() => {

        const getRequest = await supertest(app).get('/companies');
        const body = getRequest.body;
        const count = Object.keys(body).length;
        const random = Math.floor(Math.random() * count);
        const company = body[random];
        const id = company.id;

        const res = await supertest(app).get('/companies/' + id + '/planes');
        expect(res.status).toEqual(200);
    });
});