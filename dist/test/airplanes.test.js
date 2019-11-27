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
describe("Resource: airplane | File: src/airplane.ts", () => {
    it("Read: GET | route: /:id/planes | should return all airplanes of one company", () => __awaiter(void 0, void 0, void 0, function* () {
        const getCompany = yield supertest_1.default(app_1.default).get('/companies');
        const getCompanyBody = getCompany.body;
        let count = Object.keys(getCompanyBody).length;
        let random = Math.floor(Math.random() * count);
        const { _id } = getCompanyBody[random];
        const getPlane = yield supertest_1.default(app_1.default).get(`/companies/${_id}/planes`);
        const getPlaneBody = getPlane.body;
        count = Object.keys(getPlaneBody).length;
        random = Math.floor(Math.random() * count);
        const plane = getPlaneBody[random];
        expect(getCompany.status).toEqual(200);
        expect(getPlane.status).toEqual(200);
        console.log("plane", plane);
        expect(plane).toHaveProperty(["_id", "model", "numSeats"]);
        // TODO: deep check for plane models or other things
    }));
});
