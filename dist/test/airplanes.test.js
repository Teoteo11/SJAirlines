"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const airplane_1 = require("../model/airplane");
const app = express_1.default();
let mongoObjectId = () => {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'test-xxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};
describe('GET /airplanes ', () => {
    let airplaneID = mongoObjectId();
    beforeEach(() => {
        let airplane = new airplane_1.AirplaneModel({
            id: airplaneID,
            model: "Boeing 747",
            numSeats: 240
        });
        airplane.save();
    });
    it('should return JSON with all airplanes', () => {
        supertest_1.default(app)
            .get('/airplanes')
            .expect('Content-Type', /json/)
            .expect(200);
    });
    afterEach(() => {
        airplane_1.AirplaneModel.findByIdAndDelete(airplaneID);
    });
});
