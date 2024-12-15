/**
 * @Author: giaruei
 * @Date: 2024-12-01 21:19:29
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-12-15 17:20:46
 * @FilePath: /Front-Try/objectCreate.js
 * @Description: 手写 Object.create()
 */

function objectCreate(target, properties) {
  if (typeof target !== "object") {
    throw new Error("Fuck you");
  }
  const result = {};
  result.__proto__ = target;
  // 默认情况下，属性是不可写、可枚举和可配置的
  // writable: false, enumerable: true, configurable: true
  if (properties) Object.defineProperties(result, properties);
  return result;
}

const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // Inherited properties can be overwritten

me.printIntroduction();
// My name is Matthew. Am I human? true

const you = objectCreate(person, {
  name: { value: "Kobe", writable: true, enumerable: true, configurable: true },
  isHuman: {
    value: false,
    writable: true,
    enumerable: true,
    configurable: true,
  },
});
you.printIntroduction();
// My name is Kobe. Am I human? false