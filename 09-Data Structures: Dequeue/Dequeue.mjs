module.exports = class Dequeue {
  #capacity;

  #arrayConstructor;

  constructor(ArrayConstructor, capacity) {
    this.#capacity = capacity;
    this.#arrayConstructor = ArrayConstructor;
    this.array = new ArrayConstructor(capacity);

    return this; 
  }

  #initCursor() {
    this.head = this.tail = this.#getRefId(this.#capacity);
  }

  #getRefId(capacity) {
    return Math.floor(capacity/2) - 1;
  }

  #allocNewArray() {
    this.#capacity *= 2;
    const newArray = new this.#arrayConstructor(this.#capacity);
    const refId = Math.floor((this.#getRefId(this.#capacity) - this.length)/2);

    for (let i = this.head; i <= this.tail; i++) {
      newArray[refId + i] = this.array[i];
    }

    this.head += refId;
    this.tail += refId;
    this.array = newArray;
  }

  get length() {
    if (this.tail === undefined && this.head === undefined) {
      return 0;
    }

    return this.tail - this.head;
  }

  pushLeft(n) {
    if (this.head === undefined) {
      this.#initCursor();
    } else if (this.head == 0) {
      this.#allocNewArray();
    }

    this.array[this.head--] = n;

    return this.length;
  }

  popLeft() {
    if (this.head === undefined) {
      return undefined;
    }

    return this.array[++this.head];
  }

  pushRight(n) {
    console.log(this.tail, this.array.length);
    if (this.tail === undefined) {
      this.#initCursor();
    } else if (this.tail === (this.array.length - 1)) {
      this.#allocNewArray();
    }

    this.array[++this.tail] = n;
    
    return this.length;
  }

  popRight() {
    return this.array[this.tail--];
  }
}