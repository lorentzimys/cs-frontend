const {
  expect,
  test,
  describe
} = require('@jest/globals');

const Dequeue = require('./Dequeue.mjs');

describe('Dequeue:no', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('pushLeft: Возвращает длину', () => {
    const dequeue = new Dequeue(Uint8Array, 8);

    expect(dequeue.pushLeft(1)).toBe(1); // Возвращает длину - 1
    expect(dequeue.pushLeft(2)).toBe(2); // 2
    expect(dequeue.pushLeft(3)).toBe(3); // 3

    expect(dequeue.length).toBe(3); // 3
    console.log(dequeue.array);
    expect(dequeue.head).toBe(0);
    expect(dequeue.tail).toBe(3);
  });

  test('popLeft: Удаляет с начала, возвращает удаленный элемент - 3', () => {
    const dequeue = new Dequeue(Uint8Array, 8);

    expect(dequeue.pushLeft(1)).toBe(1); // Возвращает длину - 1
    expect(dequeue.pushLeft(2)).toBe(2); // 2
    expect(dequeue.pushLeft(3)).toBe(3); // 3

    expect(dequeue.length).toBe(3); // 3

    expect(dequeue.popLeft()).toBe(3);   
    console.log(dequeue.array);
    expect(dequeue.head).toBe(1);
    expect(dequeue.tail).toBe(3); 
  });

  test('pushRight', () => {
    const dequeue = new Dequeue(Uint8Array, 8);

    dequeue.pushRight(4);
    dequeue.pushRight(5);
    dequeue.pushRight(6);

    console.log(dequeue.array);
    expect(dequeue.length).toBe(3);
    expect(dequeue.head).toBe(3);
    expect(dequeue.tail).toBe(6); 
  });

  test('popRight', () => {
    const dequeue = new Dequeue(Uint8Array, 8);

    dequeue.pushLeft(1); // Возвращает длину - 1
    dequeue.pushLeft(2); // 2
    dequeue.pushLeft(3); // 3
    dequeue.pushRight(4);
    dequeue.pushRight(5);
    dequeue.pushRight(6);

    expect(dequeue.popRight()).toBe(6); 
    expect(dequeue.popRight()).toBe(5); 
    expect(dequeue.popRight()).toBe(4); 
    expect(dequeue.length).toBe(3); 
    expect(dequeue.head).toBe(0);
    expect(dequeue.tail).toBe(3); 
  });

  test('Should allocate new memory on pushLeft if reached 0 index', () => {
    const dequeue = new Dequeue(Uint8Array, 8);
    dequeue.pushLeft(1); 
    dequeue.pushLeft(2); 
    dequeue.pushLeft(3); 
    dequeue.pushLeft(4); 
    dequeue.pushLeft(5); 
    dequeue.pushLeft(6); 
    dequeue.pushLeft(7); 

    console.log(dequeue.array);
    expect(dequeue.length).toBe(7);
    expect(dequeue.head).toBe(3);
    expect(dequeue.tail).toBe(10);
  });
  
  test('Should allocate new memory on pushRight if reached last index', () => {
    const dequeue = new Dequeue(Uint8Array, 8);
    dequeue.pushRight(1); 
    dequeue.pushRight(2); 
    dequeue.pushRight(3); 
    dequeue.pushRight(4); 
    dequeue.pushRight(5); 
    dequeue.pushRight(6); 
    dequeue.pushRight(7); 
    dequeue.pushRight(8); 

    expect(dequeue.length).toBe(8);
    console.log(dequeue.array);
    expect(dequeue.head).toBe(4);
    expect(dequeue.tail).toBe(12);
  })
});
