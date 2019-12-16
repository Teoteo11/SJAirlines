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
const uuidv1 = require('uuidv1');
describe("Resource: companies | File: src/companies.ts", () => {
    it("Read: GET | should return all companies", () => __awaiter(void 0, void 0, void 0, function* () {
        const companies = (yield supertest_1.default(app_1.default).get('/companies').expect(200)).body;
        companies.array.forEach((element) => {
            expect(element).toHaveProperty("_id");
            expect(element).toHaveProperty("name");
        });
    }));
    it("Read: GET | should return a filtered company", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default).get('/companies/Alitalia').expect(200);
        expect(result.body).toHaveProperty("_id");
        expect(result.body).toHaveProperty("name");
        expect(result.body).toHaveProperty("airplanes");
        expect(result.body).toHaveProperty("routes");
    }));
    it("Create: POST | inserting existing company, should return a message that company already exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const companyName = "Alitalia";
        const result = yield supertest_1.default(app_1.default).post('/companies')
            .send({ "name": companyName });
        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty("message");
    }));
    // TODO: it("Update: PUT | editing existing company,")
    it("Delete: DELETE | deleting existing company", () => __awaiter(void 0, void 0, void 0, function* () {
        const name = uuidv1();
        const res = yield supertest_1.default(app_1.default).delete('/companies/' + `${name}`);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
    }));
    it("Delete: DELETE | deleting one company by name | CORRECT ID", () => __awaiter(void 0, void 0, void 0, function* () {
        // creare una nuova compagnia da cancellare
        const id = "5ddd7c13faf1748b9715ecda";
        const res = yield supertest_1.default(app_1.default).delete(`/companies/:${id}`);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
    }));
    it("Delete: DELETE | deleting one company by name | INCORRECT ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "pippo-pertica-e-palla";
        const res = yield supertest_1.default(app_1.default).delete(`/companies/:${id}`);
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty("message");
    }));
});
