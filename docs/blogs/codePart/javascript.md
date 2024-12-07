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
