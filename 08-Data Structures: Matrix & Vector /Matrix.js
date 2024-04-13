class Matrix {
  constructor(ArrayConstructor, ...args) {
    this.#dimCount = args.length;

    for (let i = 0; i < args.length; i++) {
      if (args[i] < 1) {
        throw new Error('Размер измерения не может быть меньше 1');
      }
    }

    this.#length = args.reduce((total, dimN) => total*=dimN, 1);

    this.#size = this.#length * ArrayConstructor.BYTES_PER_ELEMENT;
    
    this.#array = new ArrayConstructor(new ArrayBuffer(this.#size));
  }

  #length;

  #size;

  #dimCount;

  #array;

  [Symbol.iterator]() {
    const self = this;
    let i = 0;

    return { 
      next() {
        const done = i === self.#length;
        const value = done ? undefined : self.#array.at(i++);
        
        return { done, value }
      }
    }
  }

  #getIndex(...args) {
    if (args.length !== this.#dimCount) {
      throw new RangeError('Неверное количество аргументов')
    }

    return args.reduce((total, dim, i) => total += dim * 2**(this.#dimCount - 1 - i), 0);
  }

  values() {
    return this[Symbol.iterator];
  }

  set(...args) {
    if (args.length - 1 !== this.#dimCount) {
      throw new RangeError('Неверное количество аргументов')
    }

    const value = args.pop();

    return this.#array[this.#getIndex(...args)] = value;
  }

  get(...args) {
    return this.#array.at(this.#getIndex(...args));
  }
}