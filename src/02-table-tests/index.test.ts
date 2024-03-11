import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 6, b: 8, action: Action.Multiply, expected: 48 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
];

describe.each(testCases)('$a $action $b', ({ a, b, action, expected }) => {
  test(`= ${expected}`, () => {
    const input = { a, b, action };
    expect(simpleCalculator(input)).toBe(expected);
  });
});
