function fizzbuzz() {
  return {
    callCount: 0,
    value: 0,

    next() {
      if (this.callCount === 0) {
        value = BigInt(1);
      } else if (this.callCount === 1) {
        value = BigInt(2);
      } else if (this.callCount%2 === 0) {
        value = 'Fizz';
      } else {
        value = 'Buzz';
      }

      this.callCount++;

      return {
        done: false,
        value,
      };
    }
  }
}

const myFizzBazz = fizzbuzz();

console.log(myFizzBazz.next().value); // 1n
console.log(myFizzBazz.next().value); // 2n
console.log(myFizzBazz.next().value); // Fizz
console.log(myFizzBazz.next().value); // Buzz
