process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import bodyParser from 'body-parser';
import { AirplaneModel } from '../model/airplane';
import { mongoObjectId } from '../gens';
import { doesNotReject } from 'assert';
import { Mongoose } from 'mongoose';

let should = chai.should();
let app = require('../app');
app.use(bodyParser);

chai.use(chaiHttp);
chai.use(require('chai-interface'));

describe('GET /airplanes', () => {

  it('should GET all the airplanes', (done) => {
    chai.request(app)
      .get('/airplanes')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header('content-type','application/json; charset=utf-8');
        res.body.should.be.a('array');

        let testAirplane = res.body[0];
        testAirplane.should.have.interface({
          _id: String,
          model: String,
          numSeats: Number
        });

        done();    
      });
  });
});

describe('POST /airplane', () => {

  let testID = mongoObjectId();

  it('should POST a new airplane', (done) => {

    let testAirplane = new AirplaneModel({
      id: testID,
      model: "Airtest-TS",
      numSeats: 10 });

    chai.request(app)
      .post('/airplanes')
      .set('content-type', 'application/json')
      .send(testAirplane)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  afterEach('removing test airplane', () => {
    return AirplaneModel.findByIdAndDelete(testID);
  });
  
});