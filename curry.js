/**
 * @Author: giaruei
 * @Date: 2024-11-20 15:19:01
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-12-01 16:59:17
 * @FilePath: /Code/Front-Try/curry.js
 * @Description: 手写前端柯里化
 */
function curry(...args) {
  if (args.length === 0) return 0;
  let res = args.reduce((a, b) => a + b, 0);
  function inner(...innerArgs) {
    if (innerArgs.length === 0) return res;
    res += innerArgs.reduce((a, b) => a + b, 0);
    return inner;
  }
  return inner;
}
console.log(curry(1, 2)(3)(4, 5)()); // 输出: 15
console.log(curry(1, 2)(3)(4, 5)(6, 7, 8)()); // 输出: 36
