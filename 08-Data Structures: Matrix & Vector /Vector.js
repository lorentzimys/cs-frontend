class Vector {
  
  constructor(ArrayConstructor, opts) {
    const size = opts.capacity * ArrayConstructor.BYTES_PER_ELEMENT;

    this.#arrayConstructor = ArrayConstructor;

    this.#buffer = new ArrayBuffer(size);

    this.#view = new ArrayConstructor(this.#buffer);
  }

  #arrayConstructor;

  #length = 0;

  #buffer;

  #view;

  [Symbol.iterator]() {
    const self = this;
    let i = 0;

    return { 
      next() {
        const done = i === self.length;
        const value = done ? undefined : self.view.at(i++);
        
        return { done, value }
      }
    }
  }

  values() {
    return this[Symbol.iterator]();
  }

  get capacity() {
    return this.#buffer.byteLength/this.#view.BYTES_PER_ELEMENT;
  };

  get length() {
    return this.#length;
  }

  get view() {
    return this.#view;
  }

  push(value) {
    if (this.capacity <= this.length) {
      const resizeFactor = 2;
      const newSize = this.#buffer.byteLength * resizeFactor;
      
      this.resize(newSize);
    }

    this.#view.set([value], this.length);

    return this.#view.at(this.#length++);
  }

  pop() {
    const removed = this.#view.at(--this.#length);
    
    this.#view.set([0], this.length);

    return removed;
  }

  shrinkToFit() {
    if (this.length <= this.capacity) {
      this.resize(this.capacity * this.#arrayConstructor.BYTES_PER_ELEMENT);
    }
  }

  resize(newSize) {
    this.#buffer = this.#buffer.transfer(newSize);
    this.#view = new this.#arrayConstructor(this.#buffer);
  }
}

// const vec = new Vector(Int32Array, {capacity: 4});

// vec.push(1); // Возвращает длину - 1
// vec.push(2); // 2
// vec.push(3); // 3
// vec.push(4); // 4
// vec.push(5); // 5 Увеличение буфера

// console.log(vec.capacity); // 8
// console.log(vec.length);   // 5

// console.log(vec.pop()); // Удаляет с конца, возвращает удаленный элемент - 5

// console.log(vec.capacity); // 8

// vec.shrinkToFit();

// console.log(vec.capacity); // 4

// console.log(vec.buffer);   // Ссылка на ArrayBuffer
