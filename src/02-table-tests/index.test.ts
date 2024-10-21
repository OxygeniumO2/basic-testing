// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 2, b: 4, action: Action.Multiply, expected: 8 },
  { a: 8, b: 4, action: Action.Divide, expected: 2 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 1, b: 2, action: 'invalid', expected: null },
  { a: 'sas', b: 'ff', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'calculator table tests',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
