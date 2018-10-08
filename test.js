function a(a, b, children) {
  let len = arguments.length - 2;
  let arr = [];
  for (var i = 0; i < len; ++i) {
    arr[i] = arguments[i + 2];
  }
  console.log(arr);
}

a(1, 2, 3, 4, 5);
