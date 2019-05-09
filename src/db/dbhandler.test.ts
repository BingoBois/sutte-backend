import DbHandler from './dbhandler';

const dbHandler = new DbHandler();

afterAll(() => {
  dbHandler.closeCon();
});

describe('Database Integration Tests', () => {
  
  test('Create Account', async () => {
    const result = await dbHandler.createAccount('forsaftig@gmail.hot', 'styg85');
    expect(result).toBe(true);

    // Double create account
    expect(async () => {
      const result2 = await dbHandler.createAccount('forsaftig@gmail.hot', 'styg85');
    }).toThrowError();

  });

  test('Select Account', async () => {
    // Gets account, first from email, secondly from id.
    const result1 = await dbHandler.getAccount(undefined, 'forsaftig@gmail.hot');
    const result2 = await dbHandler.getAccount(result1.id, undefined);
    // Check that we get the same account back
    expect(result1).toEqual(result2);

    // Select nonexisting account error
    expect(async () => {
      const result3 = await dbHandler.getAccount(undefined, 'denstyggemail@bingo.dk');
    }).toThrowError();
  });

  test('Delete Account', async () => {
    // Delete account
    const result = await dbHandler.deleteAccount(undefined, 'forsaftig@gmail.hot');
    expect(result).toBe(true);

    // Delete nonexisting account
    expect(async () => {
      const result = await dbHandler.deleteAccount(undefined, 'forsaftig@gmail.hot');
    }).toThrowError();
  });

});
