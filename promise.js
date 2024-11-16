/**
 * @Author: giaruei
 * @Date: 2024-11-16 15:00:34
 * @LastEditors: giaruei caigiaruei@gmail.com
 * @LastEditTime: 2024-11-16 15:47:17
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
