import supertest from 'supertest';
import app from '../app';
import { AirportModel } from '../model/airport';

describe("Resource: airplane | File: src/airplane.ts", () => {

    it("GET | route: /airport | should return all airport ", async () => {
        const getAirport = await supertest(app).get('/airports');
        expect(getAirport.status).toEqual(200);
        expect(getAirport.type).toEqual(AirportModel);
    });
    
});