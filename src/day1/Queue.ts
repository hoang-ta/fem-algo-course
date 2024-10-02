class Node<T> {
    value: T;
    next?: Node<T>;

    constructor(value: T) {
        this.value = value;
    }
}

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    enqueue(item: T): void {
        const node = new Node(item);
        this.length += 1;
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
    }
    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        const node = this.head;
        this.head = this.head.next;
        this.length -= 1;
        if (this.length === 0) {
            this.tail = undefined;
        }
        return node.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
