import { describe, expect, test } from 'vitest';
import initials from './initials.js';

test('empty name shall return empty string', () => {
  expect(initials('')).toBe('');
});

describe.each([
  { name: 'Winettou', expected: 'W' },
  { name: 'Nagy Mária', expected: 'NM' },
  { name: 'Tóth Pál Roland', expected: 'TPR' },
  { name: 'Tóth-Pál Roland', expected: 'TPR' },
])('single-letter initials shall work', ({ name, expected }) => {
  test(`returns ${expected} (${name})`, () => {
      expect(initials(name)).toBe(expected);
  });
});

describe.each([
    { name: 'Dzsonni', expected: 'Dzs' },
    { name: 'Csapó Nóra', expected: 'CsN' },
    { name: 'Csapó Zsolnay Nóra', expected: 'CsZsN' },
    { name: 'Csapó Zsolnay György', expected: 'CsZsGy' },
    { name: 'Csapó-Zsolnay György', expected: 'CsZsGy' },
])('multi-letter initials shall work', ({ name, expected }) => {
    test(`returns ${expected} (${name})`, () => {
        expect(initials(name)).toBe(expected);
    });
});
