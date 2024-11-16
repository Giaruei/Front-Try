/**
 * @Author: giaruei
 * @Date: 2024-11-16 16:08:20
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-11-16 16:08:21
 * @FilePath: /Front-try/debounce.js
 * @Description: 手写节流防抖
 */
// 防抖
function debounce(fn, delay, flag) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    if (!timer && flag) {
      fn.apply(this, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}

// 节流
function throttle(fn, delay) {
  let pre = 0,
    timer = null;
  return function (...args) {
    if (Date.now() - pre > delay) {
      clearTimeout(timer);
      pre = Date.now();
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}
