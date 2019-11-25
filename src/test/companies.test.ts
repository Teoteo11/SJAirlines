import supertest from 'supertest';
import app from '../app';

describe("RESOURCE -> companies", () => {

    it("GET / it should return a single company?", async () => {
        const result = await supertest(app).get('/companies', () => {
            expect(result.status).toEqual(200);
            expect(result.body).toBeInstanceOf(Object);
        });
    });

    it("GET / it should return a filtered company", async () => {
        const query = "/?name=Alitalia";
        const result = await supertest(app).get('/companies' + query, () => {
            console.log(app.get.toString());
            expect(result.body);
        });

    });

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