import DbHandler from './dbhandler';

const dbHandler = new DbHandler();

afterAll(() => {
  dbHandler.closeCon();
});

describe('Database Integration Tests', () => {
  

  test('Create Account', async () => {
    const result = await dbHandler.createAccount('forsaftig@gmail.hot', 'styg85');
    expect(result).toBe(true);
  });

  test('Create Account 2', async () => {
    try{
      const result2 = await dbHandler.createAccount('forsaftig@gmail.hot', 'styg85');
    }catch (err){
      expect(err.code).toBe("ER_DUP_ENTRY");
    }
  })

  test('Select Account', async () => {
    // Gets account, first from email, secondly from id.
    const result1 = await dbHandler.getAccount(undefined, 'forsaftig@gmail.hot');
    const result2 = await dbHandler.getAccount(result1.id, undefined);
    // Check that we get the same account back
    expect(result1).toEqual(result2);

    // Select nonexisting account error
    try{
      const result3 = await dbHandler.getAccount(undefined, 'denstyggemail@bingo.dk');
    } catch(err){
      expect(err).toBeNull
    }
  });

  test('Delete Account', async () => {
      const result = await dbHandler.deleteAccount(undefined, 'forsaftig@gmail.hot');
      expect(result).toBe(true)
  });

  test('Delete nonexisting account', async () => {
    try{
      const result = await dbHandler.deleteAccount(undefined, 'forsaftig@gmail.hot');
    }catch(err){
      expect(err).toBe("No user to delete")
    }
  })

});
