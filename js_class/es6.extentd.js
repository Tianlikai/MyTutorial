/**
 * es6 继承
 */
class Parent {
  constructor(name) {
    this.name = name;
  }
  static getMe() {
    console.log("this is super");
  }
  getName() {
    console.log(this.name);
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  sayHello() {
    console.log(`hello my age is ${this.age}`);
  }
}
