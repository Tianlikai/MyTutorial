class Observer {
  constructor() {
    this._callbacks = {};
    this._fired = {};
  }

  queue(queue, callback) {
    const self = this;
    let eventName = "";
    let index = 0;
    let data = [];
    let task = null;

    const _getFireCb = function(eName) {
      return function(val) {
        val = val || null;
        self.fire(eName, val);
      };
    };

    const _next = function() {
      if ((task = queue.shift()) != undefined) {
        eventName = "queueEvent" + index++;
        self.addListener(eventName, function(val) {
          data.push(val);
          _next();
        });
        task.call(this, _getFireCb(eventName));
      } else {
        callback.apply(null, [data]);
      }
    };

    _next();
  }

  addListener(eventName, cb) {
    this._callbacks[eventName] = this._callbacks[eventName] || [];
    this._callbacks[eventName].push(cb);
    return this;
  }

  removeListener(eventName, cb) {
    if (!eventName) return this;

    let cbs = this._callbacks;
    let cbList;
    let cbLength;

    if (!cb) {
    } else {
    }
  }

  fire(eventName) {
    let cbs = this._callbacks;
    if (!cbs[eventName]) return this;
    let cbList = cbs[eventName];
    if (cbList) {
      cbList.forEach(cb => {
        cb.apply(this, Array.prototype.slice.call(arguments, 1));
      });
    }
  }
}

module.exports = Observer;
