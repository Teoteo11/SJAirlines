import supertest            from 'supertest';
import app                  from '../app';

describe("Resource: companies | File: src/companies.ts", () => {

    it("Read: GET | should return a single company", async () => {
        const result = await supertest(app).get('/companies');
        expect(result.status).toEqual(200);
    });

    it("Read: GET | should return a filtered company", async () => {
        const query = "/?name=Alitalia";
        const result = await supertest(app).get('/companies' + query, () => {
            expect(result.body);
        });

    });

    it("Create: POST | should return a json containing a company", async() => {
        const companyName = "Alitalia";
        const body = {"name": companyName.toString()};

        const result = await supertest(app).post('/companies').send(body);
        console.log(result.body);
        //expect(result.status).toEqual(200);
        // expect(result.body).toHaveProperty("message");
    });
    
});