import supertest            from 'supertest';
import app                  from '../app';

describe("Resource: flights | File: src/flights.ts", () => {

    it("Read: GET | route: / | should return all flights of one company", async () => {
        const getFlight = await supertest(app).get('/flights');
        const body = {...getFlight.body};
        expect(body[0]).toHaveProperty('_id');
    });
});