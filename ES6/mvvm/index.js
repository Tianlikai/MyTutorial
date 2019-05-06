(function() {
  var root = this;

  /**
   * getter/setter 自动绑定函数
   * @param {object} obj 目标对象
   * @param {string} name 属性名
   * @param {func} func 属性值改变调用回调函数
   */
  function watch(obj, name, func) {
    var value = obj[name];

    Object.defineProperty(obj, name, {
      get: function() {
        return value;
      },
      set: function(newValue) {
        value = newValue;
        func(value);
      }
    });

    if (value) obj[name] = value;
  }

  this.watch = watch; // 挂载到全局
})();

var obj = {
  value: 1,
  age: 24
};

watch(obj, "value", function(newValue) {
  document.getElementById("container").innerHTML = newValue;
});

watch(obj, "age", function(newAge) {
  console.log("age", newAge);
});

document.getElementById("button").addEventListener("click", function() {
  obj.value += 1;
  obj.age += 1;
});
