import supertest from 'supertest';
import app, { close } from '../app';

beforeAll(() => {
    // Start server
});

afterAll(() => {
    close();
});

let token: string;

describe('JWT Token Tests', () => {
    test('Will send error when missing login parameters', async () => {
        const body = {
            message: "En hyggelig besked"
        }
        const result = await supertest(app).post('/auth/login').send(body).set('Accept', 'application/json');
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({err: "Missing email and/or password"});
    });
    test('Can create a valid JWT Token', async () => {
        const body = {
            email: "2JuuciSnabelAgmail.gof",
            password: "RiveOtteOgTyve"
        }
        const result = await supertest(app).post('/auth/login').send(body).set('Accept', 'application/json');
        expect(result.status).toBe(200);
        expect(typeof(result.body)).toBe("string");
        expect(result.body.length).toBeGreaterThan(20);
        token = result.body;
    });
    test('Can use created JWT Token', async () => {
        const tokenHeader = {"authorization": token};
        const result = await supertest(app).get('/auth/viktokim').set('Accept', 'application/json').set(tokenHeader);
        expect(result.body).toMatchObject({message: "Welcome Token User"});
    });
    test('Cannot use fake JWT Token', async () => {
        const tokenHeader = {"authorization": token.substring(0, 12) + "d9j29d0j2"};
        const result = await supertest(app).get('/auth/viktokim').set('Accept', 'application/json').set(tokenHeader);
        expect(result.body).toMatchObject({message: "jwt malformed"});
    });
});
