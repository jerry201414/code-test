class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }
    
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(...args) {
        this.observers.forEach(observer => observer.notified(...args));
    }
}

class Observer {
    constructor(name, subject) {
        this.name = name;
        if (subject) {
            subject.addObserver(this);
        }
    }

    notified(...args) {
        console.log('Notified: ', ...args);
    }
}