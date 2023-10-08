export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    append: (element: T) => void;
    prepend(value: T): void;
    addByIndex(value: T, index: number): void;
    deleteByIndex(index: number): void;
    deleteHead(): void;
    deleteTail(): void;
    toArray(): Array<T>;
}

export class LinkedList<T> implements ILinkedList<T> {
    private _head: Node<T> | null;
    private _tail: Node<T> | null;
    private _size: number;

    constructor(array: Array<T> = []) {
        this._head = null;
        this._tail = null;
        this._size = 0;
        for (const item of array) {
            this.append(item);
        }
    }

    insertAt(element: T, index: number) {
        if (index < 0) {
            return;
        } else {
            const node = new Node(element);

            if (index === 0) {
                node.next = this._head;
                this._head = node;
            } else {
                let curr = this._head;
                let prev = null;
                let currIndex = 0;

                while (currIndex < index) {
                    prev = curr;
                    curr = curr!.next;
                    currIndex++;
                }

                prev!.next = node;
                node.next = curr;
            }
            this._size++;
        }
    }

    append(element: T) {
        const node = new Node(element);
        if (!this._head || !this._tail) {
            this._head = node;
            this._tail = node;
            this._size++;
            return;
        }
        const prevTail = this._tail;
        prevTail.next = node;
        this._tail = node;
    }

    prepend(value: T) {
        const node = new Node(value);
        if (!this._head || !this._tail) {
            this._head = node;
            this._tail = node;
            this._size++;
            return;
        }
        const prevHead = this._head;
        this._head = node;
        this._head.next = prevHead;
        this._size++;
    }

    addByIndex(value: T, index: number) {
        if (index < 0) {
            return;
        } else if (this._head === null || index === 0) {
            this.prepend(value);
        } else {
            let previous = this._head;
            while (index - 1 > 0 && previous.next !== null) {
                previous = previous.next;
                index--;
            }
            previous.next = new Node(value, previous.next);
        }
        this._size++;
    }

    deleteByIndex(index: number) {
        if (index < 0) {
            return;
        } else if (this._head === null || index === 0) {
            this.deleteHead();
        } else {
            let previous = this._head;
            for(let i = 0; i < index -1; i++) {
                if (previous.next === null) {
                    break;
                }
                previous = previous.next;
            }
            let toRemove = previous.next;
            previous.next = toRemove?.next || null;
        }
    }

    deleteHead() {
        if (this._head === null) {
            return null;
        }
        const prevHead = this._head;
        this._head = this._head.next;
        this._size--;
        return prevHead;
    }

    deleteTail() {
        this._size--;
        if ((this._head === null) || (this._tail === null)) {
            return null;
        } else if (this._head === this._tail) {
            const prevTail = this._tail
            this._head = null;
            this._tail = null;
            return prevTail;
        }
        else {
            let current: Node<T> | null = this._head;
            while (current?.next != this._tail) {
                current = current!.next;
            }
            const prevTail = this._tail
            this._tail = current;
            this._tail.next = null;
            return prevTail;
        }
    }

    toArray() {
        const arrayBuffer: T[] = [];
        let current = this._head;
        while (current !== null) {
            arrayBuffer.push(current.value);
            current = current.next;
        }
        return arrayBuffer;
    }
}
