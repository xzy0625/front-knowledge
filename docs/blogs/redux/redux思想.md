## redux的动机

随着 JavaScript 单页应用开发日趋复杂，**我们的编码要管理的 state（状态）比以往任何时候都要多**。 这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。

管理不断变化的 state 非常困难。如果一个 model 的变化会引起另一个 model 变化，那么当 view 变化时，就可能引起对应 model 以及另一个 model 的变化，这个变化反过来又可能引起另一个 view 的变化。当这些连锁反应到一定程度之后，你根本搞不清楚到底发生了什么。**state 在什么时候，由于什么原因，如何变化已然不受控制。** 当系统变得错综复杂的时候，想重现问题或者添加新功能就会变得举步维艰。

如果以上还不够糟糕，那想想**前端开发领域里变得越来越普遍的新需求**。作为一名前端开发者，我们可能要最优化更新、服务端渲染，在路由变化之前请求到数据等等。我们要掌管以前从未有过的复杂工作，难免会问一句：[是时候放弃了吗？](https://www.quirksmode.org/blog/archives/2015/07/stop_pushing_th.html) 答案当然是否定的。

复杂度很难降下来，因为 **我们总是混淆了两个概念**，这两个概念对我们来说很难理解：**Mutation 和异步**。我把它们比作[曼妥思和可乐](https://en.wikipedia.org/wiki/Diet_Coke_and_Mentos_eruption)。两者如果分开都是极好的，但是混在一起就是一团糟。有一些库，比如[React](https://facebook.github.io/react) 尝试在视图层面通过禁止异步操作和直接的 DOM 操作来解决这个问题。但美中不足的是 React 把 state 管理这件事情交给了开发者自己，这就是 Redux 的用武之地。

跟随 [Flux](https://facebook.github.io/flux)、[CQRS](https://martinfowler.com/bliki/CQRS.html) 和 [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html) 的脚步，通过限制更新操作的发生时间和方式，**Redux 试图让 state 的变化变得可预测**。这些限制条件体现在 Redux 的[三大原则](https://cn.redux.js.org/understanding/thinking-in-redux/three-principles)中。

- **单一数据来源**：整个应用程序的状态存储在单个存储中的对象树中。
- **状态是只读的**：改变状态的唯一方法是发出一个动作，一个描述发生了什么的对象。
- **使用纯函数进行更改**：要指定状态树如何通过操作进行转换，您可以编写纯减速器。



## 三大原则

Redux 可以用这三个基本原则来描述：

### 一：[单一数据源](https://cn.redux.js.org/understanding/thinking-in-redux/three-principles#单一数据源)

**整个应用的 [全局 state](https://cn.redux.js.org/understanding/thinking-in-redux/glossary#state) 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 [store](https://cn.redux.js.org/understanding/thinking-in-redux/glossary#store) 中。**

这条原则简化了同构应用的开发，因为在服务端的 state 可以序列化并注入到客户端，不需要做其他的一些事情。一个单一数据源 state tree 也简化了应用的调试和和监控；它也让你在开发中能将应用数据持久化到本地，从而加速开发周期。此外，有一些功能以前很难实现，比如“撤销/重做”，在单一数据源的原则下，使用 Redux 实现将非常容易。

```js
console.log(store.getState())

/* 输出
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*/
```



### 二：[State 是只读的](https://cn.redux.js.org/understanding/thinking-in-redux/three-principles#state-是只读的)

**唯一改变 state 的方法就是触发 [action](https://cn.redux.js.org/understanding/thinking-in-redux/glossary)，action 是一个用于描述已发生事件的普通对象。**

这条原则确保了视图行为和网络请求回调都不能直接修改 state，相反它们只能表达出想要修改 state 的意图。因为所有的修改都被集中化处理，且严格按照顺序一个接一个地执行，因此不用担心竞态条件（race condition）的出现。 Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。

```js
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
```



### 三：[使用纯函数来执行修改](https://cn.redux.js.org/understanding/thinking-in-redux/three-principles#使用纯函数来执行修改)

**为了描述 action 如何改变 state tree，你需要编写纯的 [reducers](https://cn.redux.js.org/understanding/thinking-in-redux/glossary#reducer)。**

Reducer 是纯函数，它接收之前的 state 和 action，并返回新的 state。记住，一定要返回一个新的对象，而不是修改之前的 state。你一开始可以只有单个 reducer，但随着应用复杂度的增长，你可以把大的 reducer 划分为一个个小的 reducers，分别管理着 state tree 的不同部分。由于 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。

```js
function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

import { combineReducers, createStore } from 'redux'
const reducer = combineReducers({ visibilityFilter, todos })
const store = createStore(reducer)
```

## 数据为什么是不可变的

Redux 要求数据不可变（Immutable）的原因主要有以下几点：

1. 易于推理和理解：不可变数据使得 Redux 的状态管理更加可预测和易于理解。当数据不可变时，我们可以清晰地知道在什么时候、通过哪个 action 发生了状态的改变。这有助于我们更好地理解和调试应用程序。
2. 性能优化：不可变数据可以帮助我们更容易地进行性能优化。例如，在 React 中，我们可以利用不可变数据进行浅比较（shallow comparison）来避免不必要的渲染。当我们知道数据不会发生变化时，我们可以避免深度比较，从而提高性能。
3. 易于实现撤销/重做功能：由于不可变数据保留了之前的状态，我们可以轻松地回滚到之前的状态，实现撤销和重做功能。
4. 易于测试：数据不可变可以简化测试，因为我们不需要担心数据在测试过程中被修改。我们可以创建一些固定的初始状态，然后根据这些状态测试我们的 reducer 和 action。
5. 避免副作用：在 Redux 中，我们希望避免副作用，以保持状态管理的纯净。数据不可变有助于我们确保 reducer 是纯函数，不会引入意外的副作用。

因此，在 Redux 中，保证数据不可变有助于我们实现更可靠、可预测和高性能的应用程序。