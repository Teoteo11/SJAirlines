process.env.NODE_ENV = 'test';

import mocha from 'mocha';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import * as Airplane from '../model/airplane';
import { Response } from 'express';

let should = chai.should();

let app = require('../app');

chai.use(chaiHttp);

describe('GET /airplanes', () => {

  it('should GET all the airplanes', (done) => {
    chai.request(app)
      .get('/airplanes')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.header('content-type','application/json; charset=utf-8');
        // res.to.have.header('content-type,','application/json');
        done();    
      });
  });
});