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
describe("Resource: tickets | File: src/tickets.ts", () => {
    it("Read: GET | should return all tickets", () => __awaiter(void 0, void 0, void 0, function* () {
        const tickets = (yield supertest_1.default(app_1.default).get('/tickets').expect(200)).body;
        tickets.array.forEach((element) => {
            expect(element).toHaveProperty("_id");
            expect(element).toHaveProperty("idCompany");
            expect(element).toHaveProperty("idFlight");
            expect(element).toHaveProperty("isChecked");
        });
    }));
    it("Read: GET | should return a single ticket", () => __awaiter(void 0, void 0, void 0, function* () {
        const tickets = (yield supertest_1.default(app_1.default).get('/tickets').expect(200)).body;
        // TODO verificare che tickets è un array di dimensione maggiore di 1
        const ticket = (yield supertest_1.default(app_1.default).get(`/tickets/${tickets[0]._id}`).expect(200)).body;
        expect(ticket._id).toBeInstanceOf(String);
        expect(ticket.idCompany).toBeInstanceOf(String);
        expect(ticket.idFlight).toBeInstanceOf(String);
        expect(ticket.isChecked).toBeInstanceOf(Boolean);
    }));
    // it("Create: POST | should create a ticket", async() => {
    // TODO MANCA CREAZIONE TICKET
    // });
});
