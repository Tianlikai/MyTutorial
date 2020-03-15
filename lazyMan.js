class LazyManClass {
  constructor(name) {
    this.name = name;
    this.taskList = [];
    console.log(`Hi I am ${this.name}`);
    setTimeout(() => this.next(), 0);
  }
  sleepFirst(time) {
    const self = this;
    const fn = (t => () => {
      console.log(`等待了${t}秒...`);
      setTimeout(() => {
        self.next();
      }, t * 1000);
    })(time);
    self.taskList.unshift(fn);
    return self;
  }
  sleep(time) {
    const self = this;
    const fn = (t => () => {
      console.log(`等待了${t}秒...`);
      setTimeout(() => {
        self.next();
      }, t * 1000);
    })(time);
    self.taskList.push(fn);
    return self;
  }
  eat(food) {
    const self = this;
    const fn = (f => () => {
      console.log(`I am eating ${f}`);
      self.next();
    })(food);
    self.taskList.push(fn);
    return self;
  }
  next() {
    const task = this.taskList.shift();
    task && task();
  }
}

const LazyMan = name => new LazyManClass(name);
// LazyMan("Tony");
// Hi I am Tony

// LazyMan("Tony")
//   .sleep(10)
//   .eat("lunch");
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan("Tony")
//   .eat("lunch")
//   .sleep(10)
//   .eat("dinner");
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan("Tony")
  .eat("lunch")
  .eat("dinner")
  .sleepFirst(5)
  .sleep(10)
  .eat("junk food");
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
