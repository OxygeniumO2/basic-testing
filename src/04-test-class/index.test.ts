// Uncomment the code below and write your tests
import { BankAccount, getBankAccount } from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  let bankAccount: BankAccount;
  let bankAccount2: BankAccount;

  const moneyValue = 100;
  const moneyValue2 = 200;

  beforeEach(() => {
    bankAccount = getBankAccount(moneyValue);
    bankAccount2 = getBankAccount(moneyValue2);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(200)).toThrowError(
      `Insufficient funds: cannot withdraw more than ${moneyValue}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(200, bankAccount2)).toThrowError(
      `Insufficient funds: cannot withdraw more than ${moneyValue}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(50, bankAccount)).toThrowError(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    bankAccount.deposit(50);
    expect(bankAccount.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(50);
    expect(bankAccount.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    bankAccount.transfer(50, bankAccount2);
    expect(bankAccount.getBalance()).toBe(50);
    expect(bankAccount2.getBalance()).toBe(250);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(100);
    (random as jest.Mock).mockReturnValueOnce(1);

    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValueOnce(50);
    (random as jest.Mock).mockReturnValueOnce(1);

    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(50);
    bankAccount.deposit(balance as number);
    expect(bankAccount.getBalance()).toBe(150);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(100);
    (random as jest.Mock).mockReturnValueOnce(0);

    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(null);
  });
});
