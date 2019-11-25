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
describe("RESOURCE -> companies", () => {
    it("GET / it should return a single company?", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(app_1.default).get('/companies', () => {
            expect(result.status).toEqual(200);
            expect(result.body).toBeInstanceOf(Object);
        });
    }));
    it("GET / it should return a filtered company", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = "/?name=Alitalia";
        const result = yield supertest_1.default(app_1.default).get('/companies' + query, () => {
            console.log(app_1.default.get.toString());
            expect(result.body);
        });
    }));
});
// describe('Login', () => {
//     it('succeeds with correct credentials', async () => {
//         const response = await GET('/companies')
//         .expect('Content-Type', '/json/')
//         .expect(200);
//          // expect(res.body.user.email).toBe(demoUser.email);
//        });
// });
// describe('Sample Test', () => {
//     it('should test that true === true', () => {
//       expect(true).toBe(true);
//     });
// });
