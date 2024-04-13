class ListItem {
  constructor(params) {
    this.value = params.value;

    if (params.prev) {
      this.prev = params.prev;
    }

    if (params.next) {
      this.next = params.next;
    }
  }
}

class LinkedList {
  first;

  last;

  size = 0;

  addFirst(value) {
    const li = {
      value,
      prev: undefined,
      next: undefined,
    }

    if (this.size === 0) {
      this.first = li;
      this.last = li;
    } else {
      const next = this.first;
      
      li.next = next;
      
      if (this.size === 1) {
        this.first.prev = li;
      }
      
      next.prev = li;

      this.first = li;
    }
    
    this.size += 1;

    return this;
  }

  addLast(value) {
    const li = {
      value,
      prev: undefined,
      next: undefined,
    }

    if (this.size === 0) {
      this.first = li;
      this.last = li;
    } else {
      const prev = this.last;
      
      li.prev = prev;
      
      if (this.size === 1) {
        this.first.next = li;
      }
      
      prev.next = li;

      this.last = li;
    }
    
    this.size += 1;

    return this;
  }


  removeLast() {
    const last = this.last;
    
    this.last = this.last.prev;
    this.last.next = undefined;
    
    last.prev = undefined;

    this.size -= 1;

    return this;
  }

  removeFirst() {
    const first = this.first;

    this.first = this.first.next;
    this.first.prev = undefined

    first.next = undefined;

    this.size -= 1;

    return this;
  }

  [Symbol.iterator] = function (params) {
    return {
      current: this.first,
      
      next() {
        if (!this.current) {
          return { done: true }
        }

        const value = this.current.value;
        this.current = this.current.next;

        return { done: false, value }
      }
    }
  }
}

const list = new LinkedList();

list.addLast(1);
list.addLast(2);
list.addLast(3);

console.log(list.first.value);           // 1
console.log(list.last.value);            // 3
console.log(list.first.next.value);      // 2
console.log(list.first.next.prev.value); // 1

for (const value of list) {
  console.log(value);
}

 
