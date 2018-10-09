/**
 * 最基础的oo 实现
 * new 构造函数实现
 */

function Animal(name) {
  this.name = name;
  this.run = function() {
    console.log(this.name + " is running!");
  };
}
var cat = new Animal("cat");
cat.run();

/**
 * 问题
 * cat 虽然有了自己的属性和方法
 * 但是没有继承性和拓展性
 *
 * 而且每次new 一个实例都会自己的方法，造成资源浪费
 */
