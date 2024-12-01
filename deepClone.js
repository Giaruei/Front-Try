/**
 * @Author: giaruei
 * @Date: 2024-12-01 17:02:45
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-12-01 20:39:51
 * @FilePath: /Front-Try/deepClone.js
 * @Description: 手写深拷贝
 */

function deepClone(target, map = new Map()) {
  if (map.has(target)) return map.get(target);
  if (target === null || target === void 0 || typeof target !== "object") {
    // ['number', 'string', 'boolean', 'bigint', 'function', 'symbol']
    return target;
  }
  if (target instanceof RegExp) {
    return new RegExp(target);
  }
  if (target instanceof Date) {
    return new Date(target);
  }
  const result = target instanceof Array ? [] : {};
  for (let key in target) {
    map.set(target, result);
    result[key] = deepClone(target[key], map);
  }
  return result;
}

const obj = {
  name: "John",
  age: 30,
  hobbies: ["reading", "gaming"],
  address: {
    city: "New York",
    zip: "10001",
  },
};

// 添加循环引用
obj.self = obj;

// 深度克隆对象
const clonedObj = deepClone(obj);

// 修改原对象以验证深度克隆
obj.name = "Doe";
obj.hobbies.push("coding");
obj.address.city = "Los Angeles";

// 输出原对象和克隆对象
console.log("Original Object:", obj);
console.log("Cloned Object:", clonedObj);

// Original Object: <ref *1> {
//   name: 'Doe',
//   age: 30,
//   hobbies: [ 'reading', 'gaming', 'coding' ],
//   address: { city: 'Los Angeles', zip: '10001' },
//   self: [Circular *1]
// }
// Cloned Object: <ref *1> {
//   name: 'John',
//   age: 30,
//   hobbies: [ 'reading', 'gaming' ],
//   address: { city: 'New York', zip: '10001' },
//   self: [Circular *1]
// }
