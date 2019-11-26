import supertest            from 'supertest';
import app                  from '../app';

describe("Resource: companies | File: src/companies.ts", () => {

    it("Read: GET | should return all airplanes of one company", async() => {

        const { body } = await supertest(app).get('/companies');
        // const count = Object.keys(body).length;
        // const random = Math.floor(Math.random() * count);
        // const company = body[random];
        console.log(body);
        const { _id } = body[0];
        console.log('id:', _id);

        const res = await supertest(app).get(`/companies/${_id}/planes`);

        expect(res.status).toEqual(200);
        // TODO: deep check for plane models or other things
    });
});