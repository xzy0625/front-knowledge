# 实现自己的promise

## 考虑的地方
1. 如何实现then的异步调用和多次调用
2. onFulfilled和onRejected是一个函数且返回值的时候需要进行Promise 解决过程：[[Resolve]](promise2, x)。只有onFulfilled和onRejected有返回值的时候才需要执行解决过程
3. onFulfilled和onRejected为空的时候需要有默认值
4. resolve和reject中的this指向问题，尽量使用箭头函数，同时写在构造函数里面
5. 如何实现promise的解决过程
   - x和promise相同
   - x为promise
   - x为对象或者函数
   - 其他情况


## 具体实现
```js
const STATUS = {
  Pending: 'Pending',
  Fulfilled: 'Fulfilled',
  Rejected: 'Rejected',
};

class MyPromise {
  constructor(excuter) {
    this.status = STATUS.Pending; // promise状态
    this.value = undefined; // resolve的解决态
    this.reason = undefined; // reject的值
    this.onFulfilledCallbacks = []; // then中onFulfilled的数组
    this.onRejectedCallbacks = []; // then中onRejected的数组

    const resolve = (value) => {
      if (this.status === STATUS.Pending) {
        this.status = STATUS.Fulfilled;
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback());
      }
    };

    const reject = (reason) => {
      if (this.status === STATUS.Pending) {
        this.status = STATUS.Rejected;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback());
      }
    };

    try {
      excuter(resolve, reject); // 传入函数执行执行器
    } catch (error) {
      reject(error);
    }
  }


  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        // 这里一定要用resolve包裹一次，为了防止promise为非promise的情况的出现
        MyPromise.resolve(promise).then(
          value => {
            resolve(value);
          },
          reason => {
            reject(reason);
          }
        );
      });
    });
  }

  then(onFulfilled, onRejected) {
    // https://xzy0625.github.io/front-knowledge/blogs/jsvascript/promise/promiseA+%E8%A7%84%E8%8C%83.html#%E8%BF%94%E5%9B%9E
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };

    const innerPromise = new MyPromise((resolve, reject) => {
      // 解决态
      const handleFulfilled = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value); // 传入promise的value
            promiseResolved(innerPromise, x, resolve, reject); // 调用解决过程
          } catch (error) {
            reject(error);
          }
        });
      };

      // 处理态
      const handleRejected = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            promiseResolved(innerPromise, x, resolve, reject); // 调用解决过程
          } catch (error) {
            reject(error);
          }
        });
      };

      // 已经解决了则直接调用
      if (this.status === STATUS.Fulfilled) {
        handleFulfilled();
      }

      // 已经拒绝了则直接调用
      if (this.status === STATUS.Rejected) {
        handleRejected();
      }

      // 等待态
      if (this.status === STATUS.Pending) {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });

    return innerPromise; // 返回新的 Promise
  }
}

// 关键点！！！！！ promise解决过程 https://xzy0625.github.io/front-knowledge/blogs/jsvascript/promise/promiseA+%E8%A7%84%E8%8C%83.html#promise-%E8%A7%A3%E5%86%B3%E8%BF%87%E7%A8%8B
function promiseResolved(promise, x, resolve, reject) {
  // 标记是否已调用，防止多次调用。promiseA+鼓励我们检测
  let called = false;

  // 1. x 与 promise 相等
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }

  // 2. x 为 Promise
  if (x instanceof MyPromise) {
    x.then(
      (value) => promiseResolved(promise, value, resolve, reject),
      (reason) => reject(reason),
    );
    // 3. 如果 x 是对象或函数
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      const then = x.then;
      // then为function
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            // 循环调用直接返回
            if (called) return;
            called = true;
            promiseResolved(promise, y, resolve, reject); // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r); // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          },
        );
      } else { // 如果 then 不是函数.直接调用 resolve
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

module.exports = MyPromise;

```

promise的缺点：
Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

## 参考
https://juejin.cn/post/6857934319886893064#heading-11
https://juejin.cn/post/6945319439772434469?searchId=2025020616571958573EF0B34FDBCD736A#heading-27
https://github.com/coderwhy/HYPromise/blob/main/HYPromise.js