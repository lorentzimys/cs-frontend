import {
  expect,
  test,
  describe
} from '@jest/globals';

import { BCD } from './index.js';

describe('BCD class', () => {

  test('Выводит число в двоичном формате', () => {
    const bcd = new BCD(65536n)
    const bcd1 = new BCD(1234567n)

    // expect(bcd.valueOf()).toBe(BigInt(0b0110_0101_0101_0011_0110));
    
    expect(bcd.valueOf()).toBe(415030n);
    expect(bcd1.valueOf()).toBe(2311527n);
  });

  test('Выводит отрицательное число в двоичном формате', () => {
    const bcd = new BCD(-65536n)

    expect(bcd.valueOf()).toBe(BigInt(0b0110_0101_0101_0011_0110));
    
    expect(bcd.valueOf()).toBe(415030n);
  });

  test('Выводит значение числа в десятичном формате по индексу разряда', () => {
    const bcd = new BCD(65536)

    expect(bcd.get(0)).toBe(6);
    expect(bcd.get(1)).toBe(3);
    expect(bcd.get(-1)).toBe(6);
    expect(bcd.get(-2)).toBe(5);
  })

})