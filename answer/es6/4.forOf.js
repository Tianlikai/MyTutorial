function forOf(object, doSomething) {
  if (typeof object[Symbol.iterator] !== "function") {
    throw new Error("object is not a iterator");
  }
  if (typeof doSomething !== "function") {
    throw new Error("doSomething should be a callable");
  }
  const iterator = object[Symbol.iterator]();
  let result = iterator.next();
  while (!result.done) {
    doSomething(result.value);
    result = iterator.next();
  }
}

function loop(value) {
  console.log(value);
}

const array = [1, 2, 3, 4];
forOf(array, loop);
