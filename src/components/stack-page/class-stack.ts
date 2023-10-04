interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
  }
  
  export class Stack<T> implements IStack<T> {
    private _container: T[];
    private _length: number = 0;
    private isEmpty = () => this._container.length === 0;

    constructor(container: T[] = []) {
      this._container = container;
    }

    get items() {
      return [...this._container];
    }

    get length() {
      return this._length;
    }

    push (item: T) {
      this._length = this._container.push(item);
    };
  
    pop () {
      if (!this.isEmpty()) {
       return this._container.pop();
      }
    };
  
    peak = (): T | null => {
      if (!this.isEmpty()) {
        return this._container[this._container.length - 1];
      }
      return null;
    };
  
    clear () {
      this._container = [];
      this._length = 0;
    }
  }
