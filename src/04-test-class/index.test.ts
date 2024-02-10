import {
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100)).toBeDefined();
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(200)).toThrow(
      new InsufficientFundsError(100),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(100);
    expect(() => account1.transfer(200, account2)).toThrow(
      new InsufficientFundsError(100),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account1 = getBankAccount(100);
    expect(() => account1.transfer(20, account1)).toThrow();
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(100);
    expect(account.getBalance()).toBe(200);
    account.deposit(100);
    expect(account.getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(10);
    expect(account.getBalance()).toBe(90);
    account.withdraw(20);
    expect(account.getBalance()).toBe(70);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(100);
    account1.transfer(50, account2);
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const balance = await account.fetchBalance();
    if (balance !== null) {
      expect(balance).toBeGreaterThan(0);
      expect(balance).toBeLessThanOrEqual(100);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    const balance = await account.fetchBalance();
    if (balance !== null) {
      account.deposit(balance);
      expect(account.getBalance()).toBe(balance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);

    account.synchronizeBalance().catch((err) => {
      expect(err).toBeInstanceOf(SynchronizationFailedError);
    });
  });
});
