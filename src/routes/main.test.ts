import supertest from 'supertest';
import app, { closeServer, openServer } from '../app';
import { signToken } from '../helpers/hash';

beforeAll((done) => {
    closeServer(() => {
        openServer(done);
    });
})

afterAll((done) => {
    closeServer(done);
});

describe('Testing main router paths', () => {
    test('Can GET courses', async () => {
        const tokenHeader = {"authorization": signToken({}, "1m")};
        const result = await supertest(app).get('/courses').set("Accept", "application/json").set(tokenHeader);
        expect(result.status).toBe(200);
    });
});
