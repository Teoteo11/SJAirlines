import supertest            from 'supertest';
import app                  from '../app';

describe("Resource: companies | File: src/companies.ts", () => {

    it("Read: GET | should return all companies", async (done) => {
        const result = await supertest(app).get('/companies');
        expect(result.status).toEqual(200);
        expect(result.body);
        done();
    });

    it("Read: GET | should return a filtered company", async (done) => {
        const result = await supertest(app).get('/companies?name=Alitalia');
        expect(result.status).toEqual(200);
        expect(result.body);
        expect(result.body).toHaveProperty("_id");
        expect(result.body).toHaveProperty("name");
        expect(result.body).toHaveProperty("airplanes");
        expect(result.body).toHaveProperty("routes");
        done();
    });

    it("Create: POST | inserting existing company, should return a message that company already exist", async() => {
        const companyName = "Alitalia";
        const result = await supertest(app).post('/companies')
        .send({"name": companyName});

        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty("message");
    });

    // TODO: it("Update: PUT | editing existing company,")

    it("Delete: DELETE | deleting existing company", async() => {

        const name = "Alitalia";
        const res = await supertest(app).delete('/companies/' + `${name}`);

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
    });

    it("Delete: DELETE | deleting all companies", async() => {

        const res = await supertest(app).delete('/companies');
        const count = res.body.count;

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("count");
        expect(count).toBeGreaterThanOrEqual(0);
    });
});