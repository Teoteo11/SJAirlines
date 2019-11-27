import supertest            from 'supertest';
import app                  from '../app';

describe("Resource: airplane | File: src/airplane.ts", () => {

    it("Read: GET | route: /:id/planes | should return all airplanes of one company", async() => {

        const getCompany = await supertest(app).get('/companies');
        const getCompanyBody = getCompany.body;
        let count = Object.keys(getCompanyBody).length;
        let random = Math.floor(Math.random() * count);
        const { _id } = getCompanyBody[random];

        const getPlane = await supertest(app).get(`/companies/${_id}/planes`);
        const getPlaneBody = getPlane.body;
        count = Object.keys(getPlaneBody).length;
        random = Math.floor(Math.random() * count);
        const plane = getPlaneBody[random];

        expect(getCompany.status).toEqual(200);
        expect(getPlane.status).toEqual(200);

        console.log("plane", plane);
        expect(plane).toHaveProperty(["_id", "model", "numSeats"]);

        // TODO: deep check for plane models or other things
    });
});