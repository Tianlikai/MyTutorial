class EventListener {
  constructor() {
    this.events = new Map();
  }
  wrapCallback(fn, once = false) {
    return { callback: fn, once };
  }
  addEventListener(type, fn, once) {
    const handler = this.events.get(type);
    if (!handler) {
      // 不存在handler
      this.events.set(type, this.wrapCallback(fn, once));
    } else if (handler && typeof handler.callback === "function") {
      // 已经存在一个handler
      this.events.set(type, [handler, this.wrapCallback(Fn, once)]);
    }
    // 存在2个以上handler
    handler.push(this.wrapCallback(fn, once));
  }
  once(type, fn) {
    this.addEventListener(type, fn, true);
  }
  removeEventListener(type, listener) {
    const handler = this.events.get(type);
    if (handler) {
      if (Array.isArray(handler)) {
        for (let i = 0; i < handler.length; i++) {
          if (handler[i].callback === listener.callback) {
            handler.splice(i, 1);
            i--;
            if (handler.length === 1) {
              this.events.set(type, handler[0]);
            }
          }
        }
      } else {
        this.events.delete(type);
      }
    } else {
      return;
    }
  }
  removeAllEventListener(type) {
    const handler = this.events.get(type);
    if (handler) {
      this.events.delete(type);
    } else {
      return;
    }
  }
  emit(type, ...args) {
    const handler = this.events.get(type);
    if (!handler) return;
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        handler[i].callback.apply(this, args);
        if (handler[i].once) this.removeEventListener(type, handler[i]);
      }
    } else {
      handler.apply(this, args);
      if (handler.once) this.removeEventListener(type, handler);
    }
    return true;
  }
}
