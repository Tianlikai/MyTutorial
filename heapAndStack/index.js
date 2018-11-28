function foo() {
  throw new Error("jason");
}

function start() {
  foo();
}

start();
