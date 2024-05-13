class Scheduler {
    constructor(limit) {
        this.limit = limit || 2;
        this.queue = [];
        this.running = [];
    }

    add(task) {
        this.queue.push(task);
        return this.run();
    }

    run() {
        if (this.queue.length && this.running.length < this.limit) {
            const task = this.queue.shift();
            const promise = task().then(() => {
                this.running.splice(this.running.indexOf(promise), 1);
            });
            this.running.push(promise);
            return promise;
        } else {
            return Promise.race(this.running).then(() => this.run());
        }
    }
}

const timeout = (time) => new Promise(resolve => {
	setTimeout(resolve, time)
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
	scheduler.add(() => timeout(time)).then(() => console.log(order))
}

// output: 2 3 4 1
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
