export class BCD {
  #isNegative;

  numbers = [];

  constructor(num) {
    num = Number(num);

    const numbers = [];

    if (num == 0) {
      this.numbers.push(0 << 0);
      return;
    }

    let sign = Math.sign(num);

    while (Math.abs(num) > 0) {
      const digit = Math.abs(num) % 10;

      num = Math.floor(Math.abs(num) / 10);

      numbers.push(digit);
    }

    let magnitude = sign > 0 ? 6 : 5;
    let acc = 0;

    while (numbers.length) {
      const digit = numbers.pop();

      acc += sign * digit * 10**Math.min(magnitude, numbers.length);
      
      if (magnitude == 0 || numbers.length == 0) {
        this.numbers.push(acc);
        
        sign = 1;
        magnitude = 6;
        acc = 0;
      }
      
      magnitude--;
    }
  }

  get(index) {
    const pad = index < 0 ? this.numbers.length + index : index;
    return this.numbers.at(index) >> 4 * pad;
  }

  valueOf() {
    // if (this.#isNegative) {
    //   return BigInt(this.numbers.reduce((acc, num, i) => acc | num << (i * 4), 0));
    // }

    return BigInt(
      this.numbers.reduce((acc, num, i) => acc | (num << ((i + 1) * 4)), 0)
    );
  }

  get isNegative() {
    return this.numbers >> 28 === 0b111;
  }
}


const n1 = new BCD(65536n);
const n2 = new BCD(-12345678);
const n3 = new BCD(23124241527n);
// const n4 = new BCD(0n);
// const n2 = new BCD(63436);

console.log(n1.valueOf());
console.log(n2.valueOf());
console.log(n3.valueOf());
// console.log(n4);
// console.log(n1.isNegative);
// console.log(n2.isNegative);
// console.log(n1, n2);