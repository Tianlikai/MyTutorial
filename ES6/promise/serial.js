var a = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1);
      resolve();
    }, 1000);
  });
};
var b = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 1000);
  });
};
var c = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3);
      resolve();
    }, 1000);
  });
};

const promises = [a, b, c];

async function serial(ps) {
  const result = [];
  for (let i = 0; i < ps.length; i += 1) {
    const item = await ps[i]();
    result.push(item);
  }
  return result;
}

// serial(promises);

function reducePromise(ps) {}

reducePromise(promises);
