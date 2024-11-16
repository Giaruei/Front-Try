/**
 * @Author: giaruei
 * @Date: 2024-11-16 14:30:42
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-11-16 14:59:47
 * @FilePath: /Front-try/bind.js
 * @Description: 手写 call、apply、bind 函数
 */

Function.prototype.mcall = function (context = window, ...args) {
  if (this === Function.prototype) {
    return undefined; // 防止 Function.prototype.mcall 直接调用
  }
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

Function.prototype.mapply = function (context = window, args) {
  if (this === Function.prototype) {
    return undefined; // 防止 Function.prototype.mapply 直接调用
  }
  const fn = Symbol();
  context[fn] = this;
  let result;
  if (Array.isArray(args)) {
    result = context[fn](...args); // 记得用点点点展开
  } else {
    result = context[fn]();
  }
  delete context[fn];
  return result;
};

Function.prototype.mbind = function (context = window, ...args1) {
  if (this === Function.prototype) {
    throw new TypeError("FUCK YOU!"); // 防止 Function.prototype.mbind 直接调用
  }
  let that = this;
  return function F(...args2) {
    if (this instanceof F) {
      return new that(...args1, ...args2);
    } else {
      return that.mapply(context, args1.concat(args2));
    }
  };
};

// test mcall
let bar = {
  name: "dad",
};
function foo(a, b, c) {
  console.log(this.name, a, b, c);
}
foo.mcall(bar, 1, 2, 3); // dad 1 2 3

// test mapply
foo.mapply(bar, [4, 5, 6]); // dad 4 5 6
this.name = "mom";
let sb; // 模拟一个 undefined，让 mapply 使用默认参数 window
foo.mapply(sb, [7, 8, 9]); // mom 7 8 9

// test mbind
let barbar = foo.mbind(bar, 3);
barbar(2, 1); // dad 3 2 1

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function () {
  console.log("Fucking " + this.name);
};
const obj = {};
let FakePerson = Person.mbind(obj);
let man = new FakePerson("Kobe", 2);
man.sayName(); // Fucking Kobe
