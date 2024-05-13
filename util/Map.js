class Map {
    constructor() {
        this.keys = [];
        this.values = [];
    }

    get size() {
        return this.keys.length;
    }

    set(key, value) {
        const index = this.keys.indexOf(key);
        if (index === -1) {
            this.keys.push(key);
            this.values.push(value);
        } else {
            this.values[index] = value;
        }
    }

    get(key) {
        const index = this.indexOf(key);
        if (index === -1) {
            return undefined;
        } else {
            return this.values[index];
        }
    } 

    has(key) {
        return this.indexOf(key) !== -1;
    }

    delete(key) {
        const index = this.keys.indexOf(key);
        if (index !== -1) {
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
        }
    }

    clear() {
        this.keys = [];
        this.values = [];
    }

    [Symbol.iterator]() {
        let index = 0;
        const keys = this.keys;
        const values = this.values;
        
        return {
            next() {
                if (index < keys.length) {
                    const key = keys[index];
                    const value = values[index];
                    index++;
                    return { value: [key, value], done: false };
                } else {
                    return { done: true };
                }
            }
        }
    }
}