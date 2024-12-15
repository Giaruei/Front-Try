/**
 * @Author: giaruei
 * @Date: 2024-12-15 16:49:40
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-12-15 16:49:42
 * @FilePath: /Front-Try/sleep.js
 * @Description: 实现非阻塞暂停
 */

async function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function foo() {
  const t0 = Date.now();
  await sleep(1500); // 暂停约1.5秒
  console.log(Date.now() - t0);
}

foo(); // 1504
