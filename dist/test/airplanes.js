"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
let should = chai_1.default.should();
let app = require('../app');
chai_1.default.use(chai_http_1.default);
describe('GET /airplanes', () => {
    it('should GET all the airplanes', (done) => {
        chai_1.default.request(app)
            .get('/airplanes')
            .end((err, res) => {
            res.should.have.status(200);
            res.should.have.header('content-type', 'application/json; charset=utf-8');
            // res.to.have.header('content-type,','application/json');
            done();
        });
    });
});
