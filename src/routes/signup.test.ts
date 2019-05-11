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

const studentAccount = {
    email: "stud1@cph.dk",
    password: "mingade"
}

describe('Testing Student Signup', () => {

    test(`Will throw error if course doesn't exist`, async () => {
        const tokenHeader = {"authorization": signToken(studentAccount, "1m")};
        const body = {
            courseID: -1
        }
        try {
            await supertest(app).post('/signup').send(body).set("Accept", "application/json").set(tokenHeader);
        } catch (err) {
            expect(err).toMatchObject({
                err: "Course does not exist"
            });
        }
    });
    
    test(`Will throw error if course is full (>= 30)`, async () => {
        const tokenHeader = {"authorization": signToken(studentAccount, "1m")};
        const body = {
            courseID: 0
        }
        try {
            await supertest(app).post('/signup').send(body).set("Accept", "application/json").set(tokenHeader);
        } catch (err) {
            expect(err).toMatchObject({
                err: "Course is already full"
            });
        }
    });

    test(`Will throw error if course is inactive`, async () => {
        const tokenHeader = {"authorization": signToken(studentAccount, "1m")};
        const body = {
            courseID: -1
        }
        try {
            await supertest(app).post('/signup').send(body).set("Accept", "application/json").set(tokenHeader);
        } catch (err) {
            expect(err).toMatchObject({
                err: "Course is inactive"
            });
        }
    });

    test(`Will throw error if token is not a students`, async () => {
        const tokenHeader = {"authorization": signToken(studentAccount, "1m")};
        const body = {
            courseID: -1
        }
        try {
            await supertest(app).post('/signup').send(body).set("Accept", "application/json").set(tokenHeader);
        } catch (err) {
            expect(err).toMatchObject({
                err: "Only students can signup for courses"
            });
        }
    });

    test(`Will throw error if student is already signed up`, async () => {
        const tokenHeader = {"authorization": signToken(studentAccount, "1m")};
        const body = {
            courseID: -1
        }
        try {
            await supertest(app).post('/signup').send(body).set("Accept", "application/json").set(tokenHeader);
        } catch (err) {
            expect(err).toMatchObject({
                err: "Already signed up for course"
            });
        }
    });

});
