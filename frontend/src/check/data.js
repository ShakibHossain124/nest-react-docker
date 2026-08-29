const obj = {
  a: 5,
  arrow: () => this,
  normal: function () {
    return this;
  },
};

console.log(obj.arrow());
console.log(obj.normal());
