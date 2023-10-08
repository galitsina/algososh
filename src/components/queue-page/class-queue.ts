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
        this._container = Array(size).fill(null);
    }

    get items() {
        return Object.values(this._container)
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
        this._tail++;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        const deletedItem = this._container[this.head % this.size];
        this._container[this.head % this.size] = null;
    
        this._head++;
        this.length--;
        return deletedItem;
    };

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this._container[this._head]
    };

    clear = () => {
        this._container = Array(this.size).fill(null);
        this._head = 0;
        this._tail = 0;
        this.length = 0;
    }
}