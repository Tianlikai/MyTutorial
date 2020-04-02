const a = {
  value: 0,
  [Symbol.toPrimitive]() {
    this.value += 1;
    return this.value;
  }
};

if (a == 1 && a == 2) {
  console.log("1");
}
