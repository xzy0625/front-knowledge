# javascript代码片段

## 实现并发请求
关键是构造一个`promsie`数组
```js
const doSomething = () => new Promise((resolve) => { resolve(1) })
const batchRequest = (arr) => {
  const promises = keys.map(key => doSomething()); // 生成promise
  const results = await Promise.all(promises); // 使用promise.all
  return results
}
```

## 实现指定数量的并发请求
关键是分割数组，每一次都运行数组的某一部分，最后再拼接结果
```js
const doSomething = () => new Promise((resolve) => { resolve(1) })
const batchRequest = (arr, batchSize = 6) => {
  let results = []
  for (let i = 0; i < arr.length; i += batchSize) {
    // 获取当前批次的keys
    const batchKeys = arr.slice(i, i + batchSize);
    // 并行处理当前批次
    const promises = batchKeys.map(key => doSomething());
    const currentRes = await Promise.all(promises);
    // 将结果按顺序合并到results中
    results = results.concat(currentRes);
  }

  return results;
}
```

## react中判断元素是否hover
关键在于使用`onMouseEnter`和`onMouseLeave`
```js
import React, { useState } from 'react';

const HoverList = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            backgroundColor: hoveredIndex === index ? 'lightblue' : 'white',
            padding: '10px',
            margin: '5px',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

```

## 实现一个事件监听类

```js
type Listener<T = any> = (eventData: T) => void;

class EventEmitter {
  private events: { [eventName: string]: Listener[] } = {};

  protected on<T>(eventName: string, listener: Listener<T>): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  protected emit<T>(eventName: string, eventData: T): void {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach((listener) => {
        listener(eventData);
      });
    }
  }

  protected off<T>(eventName: string, listener: Listener<T>): void {
    const listeners = this.events[eventName];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  protected removeAllListeners(eventName: string): void {
    if (this.events[eventName]) {
      delete this.events[eventName];
    }
  }
}

export default EventEmitter;

```

## 修改原生fetch
```js
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%- title %></title>
  </head>
  <body class="free-trade-body">
    <div id="container"></div>
  </body>
</html>
<script>
  const originalFetch = window.fetch;
  window.fetch = function aop(url, config = {}) {
    const sTime = Date.now();
    const method = (config && config.method) || 'GET';
    let fetchData = {
      type: 'HTTPTYPE.FETCH',
      method,
      requestData: config && config.body,
      url,
      response: '',
    };
    // 获取配置的headers
    const headers = new Headers(config.headers || {});
    Object.assign(headers, {
      setRequestHeader: headers.set,
    });
    config = Object.assign({}, config, headers);
    return originalFetch.apply(window, [url, config]).then(
      (res) => {
        // 克隆一份，防止被标记已消费
        const tempRes = res.clone();
        const eTime = Date.now();
        fetchData = Object.assign({}, fetchData, {
          elapsedTime: eTime - sTime,
          Status: tempRes.status,
          time: sTime,
        });
        tempRes.text().then((data) => {
          console.log(data);
        });
        return res;
      },
      // 接口报错
      (err) => {
        console.log(err, '???..dskaldkasdsad');
        throw err;
      },
    );
  }

   // 创建一个 AbortController 实例
   const controller = new AbortController();
  const signal = controller.signal;

  // 定义一个函数来执行 fetch 请求
  function fetchData(url) {
    return fetch(url, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received:', data);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch request was canceled');
        } else {
          console.error('Fetch error:', error);
        }
      });
  }

  // 使用 fetchData 函数进行请求
  // const url = 'http://127.0.0.1:3008/slow';
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const fetchPromise = fetchData(url);

  // 取消请求的示例
  // setTimeout(() => {
  //   controller.abort(); // 取消请求
  // }, 1000); // 2秒后取消请求

  // 你可以在这里继续执行其他代码
  console.log('Fetch request initiated...');
</script>
```