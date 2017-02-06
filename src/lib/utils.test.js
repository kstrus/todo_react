import {partial, pipe} from './utils'

const add = (a, b) => a + b;
const addThree = (a, b, c) => a + b + c;
const inc = (n) => n + 1;
const double = (n) => n * 2;

test('partial applies the first argument ahead of time', () => {
  const inc = partial(add, 1);
  const result = inc(2);
  expect(result).toBe(3);
});

test('pipe passes a result of inc to double', () => {
  const pipeline = pipe(inc, double);
  const result = pipeline(2);
  expect(result).toBe(6);
});

test('pipe passes a result of double to inc', () => {
  const pipeline = pipe(double, inc);
  const result = pipeline(2);
  expect(result).toBe(5);
});

test('pipe works with more than 2 functions', () => {
  const pipeline = pipe(add, inc, double, inc);
  const result = pipeline(1, 2);
  expect(result).toBe(9);
});