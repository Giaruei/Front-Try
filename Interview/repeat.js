/**
 * @Author: giaruei
 * @Date: 2024-11-17 14:12:12
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-11-17 19:02:22
 * @FilePath: /Front-try/Interview/repeat.js
 * @Description: 手写一个每 x 秒执行一次函数，一共执行 y 次的函数
 */

/*******
 * @description: 手写一个每 x 秒执行一次函数，一共执行 y 次的函数
 * @param {function} fn 要执行的函数
 * @param {number} count 执行次数
 * @param {number} delay 执行周期
 * @return {*}
 */
function repeat(fn, count, delay) {
  return function (...args) {
    // 两个变量要放在内部函数中
    let flag = 0;
    let timer = null;
    if (flag < count && !timer) {
      timer = setInterval(() => {
        fn.apply(this, args);
        flag++;
        if (flag === count) {
          clearInterval(timer);
          flag = 0;
        }
      }, delay);
    } else if (flag >= count) {
      flag = 0;
    }
  };
}
const repeatFn = repeat(console.log, 2, 1000);
repeatFn("Hello World");
repeatFn("Hello World1");

const repeatFn1 = repeat(console.log, 3, 500);
repeatFn1("Hello World2"); 