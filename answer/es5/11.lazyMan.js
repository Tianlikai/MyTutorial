class LazyMan {
  constructor(name) {
    this.name = name;
    this.list = [];
    console.log(`my name is ${this.name}`);
    setTimeout(this.next, 0);
  }
  sleepFirst(time) {
    const self = this;
    const fn = (t => () => {
      console.log(`${t} seconds`);
      setTimeout(self.next, t * 1000);
    })(time);
    this.list.unshift(fn);
    return this;
  }
  sleep(time) {
    const self = this;
    const fn = (t => () => {
      console.log(`${t} seconds`);
      setTimeout(self.next, t * 1000);
    })(time);
    this.list.push(fn);
    return this;
  }
  eat(words) {
    const self = this;
    const fn = (text => () => {
      console.log(text);
      self.next();
    })(words);
    this.list.push(fn);
    return this;
  }
  next() {
    const task = this.list.shift();
    task && task();
  }
}
