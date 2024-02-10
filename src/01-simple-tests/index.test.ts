import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 1, b: 2, action: Action.Add };
    expect(simpleCalculator(input)).toBe(3);
  });

  test('should subtract two numbers', () => {
    const input = { a: 5, b: 2, action: Action.Subtract };
    expect(simpleCalculator(input)).toBe(3);
  });

  test('should multiply two numbers', () => {
    const input = { a: 5, b: 4, action: Action.Multiply };
    expect(simpleCalculator(input)).toBe(20);
  });

  test('should divide two numbers', () => {
    const input = { a: 8, b: 4, action: Action.Divide };
    expect(simpleCalculator(input)).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 5, b: 2, action: Action.Exponentiate };
    expect(simpleCalculator(input)).toBe(25);
  });

  test('should return null for invalid action', () => {
    const input = { a: 5, b: 4, action: null };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: '5', b: 4, action: Action.Add };
    expect(simpleCalculator(input)).toBeNull();
  });
});
