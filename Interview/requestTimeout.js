/**
 * @Author: giaruei
 * @Date: 2024-11-17 19:19:19
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-11-17 19:31:32
 * @FilePath: /Front-try/Interview/requestTimeout.js
 * @Description:
 */

/*******
 * @description: 执行请求 requestFn，如果未返回结果超时 delay 则报错
 * @param {*} requestFn 执行的动作，如请求
 * @param {*} delay 设定超时的时间
 * @return {*}
 */
function requestTimeout(requestFn, delay) {
  return Promise.race([
    requestFn,
    new Promise((_, rej) => setTimeout(() => rej(), delay)),
  ]);
}
// 如果 6s 内没有结果就会报错
requestTimeout(fetch("https://yesno.wtf/api"), 6000)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
