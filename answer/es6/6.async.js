async function test() {
  let arr = [4, 2, 1];
  arr.forEach(async item => {
    const res = await handle(item);
    console.log(res);
  });
  console.log("结束");
}

function handle(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x);
    }, 1000);
  });
}

test();
