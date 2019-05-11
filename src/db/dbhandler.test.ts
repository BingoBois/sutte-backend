import DbHandler from './dbhandler';
import { closeServer } from '../app';

let dbHandler = new DbHandler();

afterAll((done) => {
    dbHandler.closeCon(() => {
        closeServer(async () => {
            await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
            done();
        });
   });
});

let selectAccountID: number;

describe('Database Integration Tests | No Data Required', () => {

    test('Create Account', async (done) => {
        const result = await dbHandler.createAccount('forsaftig@gmail.hot', 'styg85', 'admin', 'Bygge Peter');
        expect(result).toBe(true);
        done();
    });

    test('Create Account 2', async () => {
        try {
            await dbHandler.createAccount('forsaftig@gmail.hot', 'styg85', 'admin', 'Bygge Peter');
        } catch (err) {
            expect(err.code).toBe("ER_DUP_ENTRY");
        }
    })

    test('Select non-working account', async (done) => {
        try {
            await dbHandler.getAccount('denstyggemail@bingo.dk');
            done();
        } catch (err) {
            expect(err).toBe("Account not found");
            done();
        }
    });

    test('Select working account by email', async () => {
        const email = 'forsaftig@gmail.hot';
        const result = await dbHandler.getAccount(email);
        expect(result.email).toBe(email);
        selectAccountID = result.id;
    });

    test('Select Account', async () => {
        // Gets account, first from email, secondly from id.
        const email = 'forsaftig@gmail.hot';
        const result = await dbHandler.getAccount(selectAccountID);
        // Check that we get the same account back
        expect(result.email).toEqual(email);
    });

    test('Delete Account', async () => {
        const result = await dbHandler.deleteAccount(undefined, 'forsaftig@gmail.hot');
        expect(result).toBe(true)
    });

    test('Delete nonexisting account', async () => {
        try {
            await dbHandler.deleteAccount(undefined, 'forsaftig@gmail.hot');
        } catch (err) {
            expect(err).toBe("No user to delete")
        }
    })

});

describe('Database Integration Tests | With Premade Data', () => {
    test('Jaja', () => {
        expect(true).toBe(true);
    });
});
