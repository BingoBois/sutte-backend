import axios from 'axios';
import authRouter from './auth';

beforeAll(() => {
  // Start server
});


describe('Integration JWT test', () => {
  test('Authorize premade token', async () => {
    const response = await axios(authRouter).get(`/auth`);
    console.log(response);
    expect(response).toBe("85");
  });

  test('Make new token', async () => {
    const response = await supertest(authRouter).post(`/login`).send({ email: "forsaftig@sut.dk", password: "slikminmaas85"});
    expect(response.status).toBe(200);
  });
});
