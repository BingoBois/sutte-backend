import supertest from 'supertest';
import app, { close } from '../app';

afterAll(() => {
    close();
});

describe('Testing main router paths', () => {
    test('Can GET ya boi', async () => {
        const result = await supertest(app).get('/').set("Accept", "application/json");
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({message: "Ya boi"});
    });
});
