import supertest from 'supertest';
import app, { closeServer, openServer } from '../app';

beforeAll((done) => {
    closeServer(() => {
        openServer(done);
    });
})

afterAll((done) => {
    closeServer(done);
});

let token: string;

describe('JWT Token Tests', () => {
    test('Will send error when missing login parameters', async () => {
        const body = {
            message: "En hyggelig besked"
        }
        const result = await supertest(app).post('/auth/login').send(body).set('Accept', 'application/json');
        expect(result.body).toMatchObject({err: "Missing email and/or password"});
    });
    test('Will send error with incorrect login details', async () => {
        const body = {
            email: "2JuuciSnabelAgmail.gof",
            password: "RiveOtteOgTyve"
        }
        const result = await supertest(app).post('/auth/login').send(body).set('Accept', 'application/json');
        expect(result.body).toMatchObject({ 
            err: 'No account with email: 2JuuciSnabelAgmail.gof' 
        });
    });
    test('Can create a valid JWT Token', async () => {
        const body = {
            email: "kongen@bingo.dk",
            password: "mingade"
        }
        const result = await supertest(app).post('/auth/login').send(body).set('Accept', 'application/json');
        expect(typeof(result.body)).toBe("string");
        expect(result.body.length).toBeGreaterThan(20);
        token = result.body;
    });
    test('Can use created JWT Token', async () => {
        const tokenHeader = {"authorization": token};
        const body = {
            token
        }
        const result = await supertest(app).post('/auth/checktoken').send(body).set('Accept', 'application/json').set(tokenHeader);
        expect(result.body).toMatchObject({
            message: "Token is valid"
        });
    });
    test('Cannot use fake JWT Token', async () => {
        const tokenHeader = {"authorization": token.substring(0, 12) + "d9j29d0j2"};
        const body = {
            token
        }
        const result = await supertest(app).post('/auth/checktoken').send(body).set('Accept', 'application/json').set(tokenHeader);
        expect(result.body).toMatchObject({
            name: "JsonWebTokenError"
        });
    });
});
