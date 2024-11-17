/**
 * @Author: giaruei
 * @Date: 2024-11-17 13:58:43
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-11-17 14:07:11
 * @FilePath: /Front-try/Lazyman.js
 * @Description: 手写 Lazyman 类
 */

class Lazyman {
  constructor(name) {
    this.name = name;
    this.task = [];
    console.log("Hello, I am", name);
    setTimeout(() => {
      this.next();
    }, 0);
  }
  eat(food) {
    this.task.push(() => {
      console.log("I am eating", food);
      this.next();
    });
    return this;
  }
  sleep(time) {
    this.task.push(() =>
      setTimeout(() => {
        console.log("Sleep for", time, "s");
        this.next();
      }, time * 1000)
    );
    return this;
  }
  sleepFirst(time) {
    this.task.unshift(() =>
      setTimeout(() => {
        console.log("Sleep for", time, "s First");
        this.next();
      }, time * 1000)
    );
    return this;
  }
  next() {
    let fn = this.task.shift();
    fn && fn();
  }
}

const kobe = new Lazyman("Kobe");
kobe.eat("basketball").sleep(1).sleepFirst(0.5).eat('man');
