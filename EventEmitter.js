/**
 * @Author: giaruei
 * @Date: 2025-01-17 11:44:00
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2025-01-19 15:47:02
 * @FilePath: /Front-Try/EventEmitter.js
 * @Description: 手写发布订阅模式
 */
class EventEmitter {
  constructor() {
    this.event = {}; // 用于存储事件及其对应的回调函数
  }
  // 订阅事件
  subscribe(eventName, callback) {
    if (!this.event[eventName]) {
      this.event[eventName] = []; // 初始化事件的回调列表
    }
    this.event[eventName].push(callback); // 添加回调函数
  }
  // 取消订阅事件
  off(eventName, callback) {
    if (this.event[eventName]) {
      this.event[eventName] = this.event[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }
  // 发布事件
  publish(eventName, ...args) {
    if (this.event[eventName]) {
      this.event[eventName].forEach((callback) => {
        callback(...args); // 调用所有订阅的回调，并传递参数
      });
    }
  }
}

const emitter = new EventEmitter();

function callback1(data) {
  console.log("Callback 1 triggered with data:", data);
}
function callback2(data) {
  console.log("Callback 2 triggered with data:", data);
}
// 订阅事件1
emitter.subscribe("testEvent", callback1);
// 订阅事件2
emitter.subscribe("testEvent", callback2);
// 发布事件，传递参数
emitter.publish("testEvent", { message: "Fuck You!" });
// Callback 1 triggered with data: { message: 'Fuck You!' }
// Callback 2 triggered with data: { message: 'Fuck You!' }

// 取消订阅 callback1
emitter.off('testEvent', callback1);
// 再次发布事件
emitter.publish('testEvent', { message: 'Fuck You AGAIN!' });
// Callback 2 triggered with data: { message: 'Fuck You AGAIN!' }

//定义一家猎人工会
//主要功能包括任务发布大厅(topics)，以及订阅任务(subscribe)，发布任务(publish)
let HunterUnion = {
  type: "hunt",
  topics: Object.create(null),
  subscribe: function (topic, fn) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(fn);
  },
  publish: function (topic, money) {
    if (!this.topics[topic]) return;
    for (let fn of this.topics[topic]) {
      fn(money);
    }
  },
};

//定义一个猎人类
//包括姓名，级别
function Hunter(name, level) {
  this.name = name;
  this.level = level;
}
//猎人可在猎人工会发布订阅任务
Hunter.prototype.subscribe = function (topic, fn) {
  console.log(
    this.level + "猎人" + this.name + "订阅了狩猎" + topic + "的任务"
  );
  HunterUnion.subscribe(topic, fn);
};
Hunter.prototype.publish = function (topic, money) {
  console.log(
    this.level + "猎人" + this.name + "发布了狩猎" + topic + "的任务"
  );
  HunterUnion.publish(topic, money);
};

//猎人工会走来了几个猎人
let hunterMing = new Hunter("小明", "黄金");
let hunterJin = new Hunter("小金", "白银");
let hunterZhang = new Hunter("小张", "黄金");
let hunterPeter = new Hunter("Peter", "青铜");

//小明，小金，小张分别订阅了狩猎tiger的任务
hunterMing.subscribe("tiger", function (money) {
  console.log("小明表示：" + (money > 200 ? "" : "不") + "接取任务");
});
hunterJin.subscribe("tiger", function (money) {
  console.log("小金表示：接取任务");
});
hunterZhang.subscribe("tiger", function (money) {
  console.log("小张表示：接取任务");
});
//Peter订阅了狩猎sheep的任务
hunterPeter.subscribe("sheep", function (money) {
  console.log("Peter表示：接取任务");
});

//Peter发布了狩猎tiger的任务
hunterPeter.publish("tiger", 198);

//猎人们发布(发布者)或订阅(观察者/订阅者)任务都是通过猎人工会(调度中心)关联起来的，他们没有直接的交流。
