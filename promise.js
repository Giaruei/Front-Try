/**
 * @Author: giaruei
 * @Date: 2024-11-16 15:00:34
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-11-16 16:05:00
 * @FilePath: /Front-try/promise.js
 * @Description: 手写 promise 和她的方法
 */
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promisee {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    return new Promisee((res, rej) => {
      if (this.state === FULFILLED) {
        try {
          const data = onFulfilled(this.value);
          if (data instanceof Promisee) {
            data.then(res, rej);
          } else {
            res(data);
          }
        } catch (e) {
          rej(e);
        }
      }
      if (this.state === REJECTED) {
        try {
          const data = onRejected(this.reason);
          if (data instanceof Promisee) {
            data.then(res, rej);
          } else {
            rej(data);
          }
        } catch (e) {
          rej(e);
        }
      }
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          try {
            const data = onFulfilled(this.value);
            if (data instanceof Promisee) {
              data.then(res, rej);
            } else {
              res(data);
            }
          } catch (e) {
            rej(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            const data = onRejected(this.reason);
            if (data instanceof Promisee) {
              data.then(res, rej);
            } else {
              rej(data);
            }
          } catch (e) {
            rej(e);
          }
        });
      }
    });
  }
}

new Promisee((res, rej) => {
  setTimeout(() => {
    res(1); // 如果先执行这一句结果为 suces 1 suces 22 suces 1
    rej(1); // 如果先执行这一句结果为 fail 1 fail 33 fail 1
  });
})
  .then(
    (data) => {
      console.log("suces", data);
      return data * 22;
    },
    (err) => {
      console.log("fail", err);
      return err * 33;
    }
  )
  .then(
    (data) => {
      console.log("suces", data);
      return data / 22;
    },
    (err) => {
      console.log("fail", err);
      return err / 33;
    }
  )
  .then(
    (data) => {
      console.log("suces", data);
    },
    (err) => {
      console.log("fail", err);
    }
  );

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let resultCount = 0;
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Promises must be an array"));
    }
    if (promises.length === 0) resolve([]);
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          result[index] = value;
          resultCount++;
          if (resultCount === promises.length) {
            resolve(result);
          }
        })
        .catch((e) => reject(e));
    });
  });
}

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Promises must be an array"));
    }
    if (promises.length === 0) {
      return resolve(undefined);
    }
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((value) => resolve(value))
        .catch((e) => reject(e));
    });
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then((res) => console.log(res)) // [1, 2, 3]
  .catch((e) => console.log(e));

const p4 = new Promise((resolve) => setTimeout(resolve, 1000, "p4"));
const p5 = new Promise((resolve) => setTimeout(resolve, 500, "p5"));

promiseRace([p4, p5])
  .then((value) => {
    console.log(value); // 输出: 'p5'，因为 p5 是第一个解决的promise
  })
  .catch((error) => {
    console.error(error);
  });
