1. promise传入的函数是立马执行的
2. promise变为fullied和rejected之后是不可更改的

### 1. 调用 `resolve` 时的处理

- **普通值**：如果传入的是一个普通值（如字符串、数字、对象等），Promise 会将其视为已兑现的值，Promise 的状态会变为已兑现，且该值会被传递给 `onFulfilled` 回调。
- **Promise 对象**：如果传入的是一个 Promise 对象，Promise 会等待这个 Promise 兑现或拒绝：
  - 如果传入的 Promise 兑现，返回的 Promise 也会兑现，并且其值为传入 Promise 的值。
  - 如果传入的 Promise 拒绝，返回的 Promise 也会拒绝，并且其拒绝原因为传入 Promise 的拒绝原因。
- **其他对象（thenable）**：如果传入的是一个具有 `then` 方法的对象（即 thenable），Promise 会调用这个对象的 `then` 方法，并将 `resolve` 和 `reject` 作为参数传入：
  - 如果 `then` 方法调用 `resolve`，返回的 Promise 会兑现。
  - 如果 `then` 方法调用 `reject`，返回的 Promise 会拒绝。
  - 如果 `then` 方法抛出错误，返回的 Promise 也会拒绝，拒绝原因是抛出的错误。

### 2. 调用 `reject` 时的处理

- **普通值**：如果传入的是一个普通值，Promise 会将其视为拒绝的原因，Promise 的状态会变为已拒绝，且该值会被传递给 `onRejected` 回调。
- **Promise 对象**：如果传入的是一个 Promise 对象，Promise 会等待这个 Promise 兑现或拒绝：
  - 如果传入的 Promise 兑现，返回的 Promise 仍然是拒绝状态，拒绝原因为传入的 Promise 的拒绝原因。
  - 如果传入的 Promise 拒绝，返回的 Promise 也会拒绝，并且其拒绝原因为传入 Promise 的拒绝原因。
- **其他对象（thenable）**：如果传入的是一个具有 `then` 方法的对象，Promise 的行为与上述相同，调用 `then` 方法并处理结果。

### 总结

- `resolve` 和 `reject` 的处理方式主要取决于传入的值是否是 Promise 或 thenable。
- 对于 `resolve`，如果传入的是 Promise，则会根据其状态决定返回 Promise 的状态；对于 `reject`，同样的逻辑适用。
- 对于普通值，`resolve` 会将其视为成功的结果，而 `reject` 会将其视为失败的原因。


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

