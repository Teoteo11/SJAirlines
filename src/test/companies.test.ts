import supertest from 'supertest';
import app from '../app';

import { CompanyModel } from "../model/company";


describe("RESOURCE -> companies", () => {

    it("GET / it should return a single company", async () => {
        const result = await supertest(app).get('/companies');
        expect(result.status).toEqual(200);
    });

    it("GET / it should return a filtered company", async () => {
        const query = "/?name=Alitalia";
        const result = await supertest(app).get('/companies' + query, () => {
            expect(result.body);
        });

    });

});

describe("RESOURCE -> companies", () => {

    it("POST / should return a json message with a company", async() => {
        const companyName = "Alitalia";
        const body = {"name": companyName.toString()};

        const result = await supertest(app).post('/companies').send(body);
        console.log(result.body);
        //expect(result.status).toEqual(200);
        // expect(result.body).toHaveProperty("message");
    });
});

// describe('Login', () => {

//     it('succeeds with correct credentials', async () => {
//         const response = await GET('/companies')
//         .expect('Content-Type', '/json/')
//         .expect(200);
//          // expect(res.body.user.email).toBe(demoUser.email);
//        });
// });

// describe('Sample Test', () => {
//     it('should test that true === true', () => {
//       expect(true).toBe(true);
//     });
// });