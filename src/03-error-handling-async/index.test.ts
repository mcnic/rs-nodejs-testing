import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue(5);
    expect(data).toBe(5);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('my error')).toThrow('my error');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', () => {
    expect(rejectCustomError).rejects.toThrow(new MyAwesomeError());
  });
});
