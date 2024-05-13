class PromiseLimit {
    constructor(limit) {
        this.limit = limit;
        this.running = 0;
        this.queue = [];
    }

    add(fn) {
        if (this.running < this.limit) {
            this.run(fn);
        } else {
            this.queue.push(fn);
        }
    }

    run(fn) {
        this.running++;
        fn().then(() => {
            this.running--;
            if (this.queue.length > 0) {
                this.run(this.queue.shift());
            }
        });
    }
}