class PubSub {
    constructor() {
        this.events = {};
    }

    subscribe(event, callback) {
        if (this.events[event]) {
            this.events[event].push(callback);
        } else {
            this.events[event] = [callback];
        }
    }

    publish(event, ...args) {
        const events = this.events[event];

        if (events && events.length) {
            events.forEach(callback => callback.call(this, ...args));
        }  
    }

    unsubscribe(event, callback) {
        const events = this.events[event];

        if (events && events.length) {
            this.events[event] = events.filter(cb => cb !== callback);
        }
    }

    once(event, callback) {
        const wrapper = (...args) => {
            callback.call(this, ...args);
            this.unsubscribe(event, wrapper);
        };

        this.subscribe(event, wrapper);
    }
}