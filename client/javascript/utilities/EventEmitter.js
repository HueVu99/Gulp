let instance;
class EventEmitter {
  callbacks = {};

  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
  }

  on = (event = '', cb) => {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(cb);
  };

  emit = (event, data) => {
    const callbacks = this.callbacks[event];
    if (callbacks) {
      callbacks.forEach((cb) => {
        cb(data);
      });
    }
  };
}

export default new EventEmitter();
