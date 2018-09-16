var a = {
  a: 1
};

var b = Object.create(a);

b.a++;
console.log(a.hasOwnProperty("a"));
console.log(b.hasOwnProperty("a"));
console.log(b.a);
console.log(a.a);
