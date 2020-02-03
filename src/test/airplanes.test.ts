import mocha from 'mocha';
import supertest from 'supertest';
import express from 'express';
import { AirplaneModel } from '../model/airplane';


const app = express();

let mongoObjectId = () => {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'test-xxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
};

describe('GET /airplanes ', () => {

  let airplaneID = mongoObjectId();

  beforeEach(() => {
    let airplane = new AirplaneModel({
      id: airplaneID,
      model: "Boeing 747",
      numSeats: 240
    });
    airplane.save();
  });

  it('should return JSON with all airplanes', () => {
    supertest(app)
      .get('/airplanes')
      .expect('Content-Type', /json/)
      .expect(200)
  });

  afterEach(() => {
    AirplaneModel.findByIdAndDelete(airplaneID);
  })
});