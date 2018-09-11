class CArray {
  constructor(num) {
    this.num = num;
    this.dataStore = [];
    for (let i = 0; i < num; ++i) {
      this.dataStore[i] = Math.floor(Math.random() * (num + 1));
    }
  }
  getData() {
    return this.dataStore;
  }
  clear() {
    this.dataStore = [];
    this.num = 0;
  }
}

module.exports = CArray;
