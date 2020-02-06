"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const body_parser_1 = __importDefault(require("body-parser"));
const airplane_1 = require("../model/airplane");
const gens_1 = require("../gens");
let should = chai_1.default.should();
let app = require('../app');
app.use(body_parser_1.default);
chai_1.default.use(chai_http_1.default);
chai_1.default.use(require('chai-interface'));
describe('GET /airplanes', () => {
    it('should GET all the airplanes', (done) => {
        chai_1.default.request(app)
            .get('/airplanes')
            .end((err, res) => {
            res.should.have.status(200);
            res.should.have.header('content-type', 'application/json; charset=utf-8');
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
    let testID = gens_1.mongoObjectId();
    it('should POST a new airplane', (done) => {
        let testAirplane = new airplane_1.AirplaneModel({
            id: testID,
            model: "Airtest-TS",
            numSeats: 10
        });
        chai_1.default.request(app)
            .post('/airplanes')
            .set('content-type', 'application/json')
            .send(testAirplane)
            .end((err, res) => {
            res.should.have.status(201);
            done();
        });
    });
    afterEach('removing test airplane', () => {
        return airplane_1.AirplaneModel.findByIdAndDelete(testID);
    });
});
