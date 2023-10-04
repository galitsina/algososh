interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
    private _container: Record<number, T | null> = {};
    private _head = 0;
    private _tail = 0;
    private readonly size: number = 0;
    private length: number = 0;
    isEmpty = () => this.length === 0;

    constructor(size: number) {
        this.size = size;
        this._container = Array(size);
    }

    get items() {
        return Object.values(this._container);
    }

    get head() {
        return this._head;
    }

    get tail() {
        return this._tail;
    }
    
    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this._container[this._tail] = item;
        this._tail = (this._tail + 1) % this.size;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        this._container[this._head] = null;
        this._head = (this._head + 1) % this.size;
        this.length--;
    };

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this._container[this._head]
    };

}