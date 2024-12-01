/**
 * @Author: giaruei
 * @Date: 2024-12-01 23:41:58
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-12-01 23:54:06
 * @FilePath: /Front-Try/Scheduler.js
 * @Description: 手写 Scheduler，实现有并行限制的 Promise 调度器
 */

class Scheduler {
  constructor() {
    this.queue = [];
    this.maxCount = 2;
    this.runCount = 0;
  }
  add(promiseCreator) {
    this.queue.push(promiseCreator);
  }
  request() {
    if (this.queue.length <= 0 || this.runCount >= this.maxCount) return;
    this.runCount++;
    const task = this.queue.shift();
    task().then(() => {
      this.runCount--;
      this.request();
    });
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

scheduler.taskStart();
