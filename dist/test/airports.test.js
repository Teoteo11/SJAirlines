"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const airport_1 = require("../model/airport");
describe("Resource: airplane | File: src/airplane.ts", () => {
    it("Read: GET | route: /airport | should return all airport ", () => __awaiter(void 0, void 0, void 0, function* () {
        const getAirport = yield supertest_1.default(app_1.default).get('/airports');
        expect(getAirport.status).toEqual(200);
        expect(getAirport.type).toEqual(airport_1.AirportModel);
    }));
});
