class Node<T> {
    value: T;
    prev?: Node<T>;

    constructor(value: T) {
        this.value = value;
    }
}

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        this.length += 1;
        const node = new Node(item);
        if (!this.head) {
            this.head = node;
            return;
        }
        node.prev = this.head;
        this.head = node;
    }

    pop(): T | undefined {
        if (!this.head) return undefined;
        this.length -= 1;
        const poppedNode = this.head;
        this.head = this.head.prev;
        return poppedNode.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
