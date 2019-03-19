const freeSelf =
  typeof self == "object" && self !== null && self.Object === Object && self;

const root = freeSelf || Function("return this")();

// export default root;
module.exports = root;
