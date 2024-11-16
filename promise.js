/**
 * @Author: giaruei
 * @Date: 2024-11-16 15:00:34
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-11-16 15:33:39
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
