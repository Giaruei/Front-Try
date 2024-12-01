/**
 * @Author: giaruei
 * @Date: 2024-12-01 21:00:59
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-12-01 21:16:53
 * @FilePath: /Front-Try/new.js
 * @Description: 手写 new
 */

function _new(target, ...args) {
  const obj = Object.create(target.prototype);
  const result = target.apply(obj, args);
  if (result && (typeof result === "object" || typeof result === "function")) {
    return result;
  }
  return obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log("Fuck you, I am " + this.name + ' and I am fucking ' + this.age + ' years old.');
};

const man = _new(Person, "Kobe", 4);
man.greet(); // Fuck you, I am Kobe and I am fucking 4 years old.
