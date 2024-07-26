## redux

首先明白`redux`并不是服务于某个特定的框架，他只是实现了一套全局的状态管理，我们可以将其适用于任何框架。例如为了和`react`配套我们就实现了`react-redux`。

### redux和框架如何联动

在`redux`中，数据改变只能是由`dispatch`引起的，但是这个数据的改变没办法引起框架UI的渲染。所以这里需要有一个桥梁，可以实现双向通信。

> `redux`数据改变 ->` UI`渲染
>
> 用户触发`UI`事件 -> `redux`数据改变 -> ` UI`渲染

这里面的关键就是我们创建完`store`之后，通过`context`和`react`产生关联。我们可以在`store`上获取到`state`，`subscribe`，`dispatch`。

所以，用户触发`UI`事件就是调用`context`上的`store`的`dispatch`。`dispatch`又会触发`store`上绑定的监听事件的调用。所以在我们使用`useSelector`这种`hooks`的时候，我们会在`store`上添加一个`listner`。这个`listner`会触发组件的渲染。（react帮我们实现了这样一个`hooks`: `usesyncexternalstore`。可以实现`UI`渲染）。

### createSelector如何缓存

```js
const selector = createSelector(
  [
    (state: RootState) => state.todos,
    (state: RootState) => state.alerts,
    (state: RootState, id: number) => state.todos[id]
  ],
  (allTodos, allAlerts, selectedTodo) => {
    console.log(111111, '计算了一次')
    return {
      allTodos,
      allAlerts,
      selectedTodo
    }
  }
)

selector(state, 1) // 打印 111111, 计算了一次
selector(state, 1) // 不打印
```

`createSelector`内部会有一个`weakMap`的缓存对象。会按照返回的`selector`中传递的参数一个个存储下来（这些参数不变，说明我们传入的`inputSelector`肯定也不会变），例如上面的缓存如下：

```js
cacheNode = {
	o: {
    state: {
      p: {
        1: state
      }
    }
  }
}
```

所以我们可以通过一层一层去参数来获取值，只要有一个取不到就代表没有缓存，要重新计算。

### subscribe如何解除监听

```js
let currentListeners: Map<number, ListenerCallback> | null = new Map() // 存储监听器
let nextListeners = currentListeners
let listenerIdCounter = 0 // id自增，用来代指特定的监听器
let isDispatching = false

function subscribe(listener: () => void) {
    if (typeof listener !== 'function') {
      // 报错
    }

    if (isDispatching) {
      // 报错
    }

    let isSubscribed = true

    ensureCanMutateNextListeners()
    const listenerId = listenerIdCounter++
    nextListeners.set(listenerId, listener) // Map添加新的监听

    return function unsubscribe() { // 解除监听函数
      if (!isSubscribed) {
        return
      }

      if (isDispatching) {
        // 报错
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      nextListeners.delete(listenerId) // 删除指定的监听器
      currentListeners = null
    }
  }
```

底层通过一个Map和一个全局自增的`listenerIdCounter`来完成。每次调用`subscribe`，`listenerIdCounter`自增1。所以后面我们解除监听的时候我们只需要删除对应的监听器就好了。

### redux性能优化

Redux 是一个优秀的状态管理库，但在某些情况下，它可能导致性能问题。以下是一些建议，可以帮助你对 Redux 进行性能优化。

1. 使用 Reselect 库

   Reselect 是一个用于创建可记忆的、可组合的 selector 函数的库。使用 Reselect 可以避免不必要的重新渲染和计算，从而提高性能。

2. 避免在 mapStateToProps 中创建新对象

   在 mapStateToProps 函数中创建新对象可能导致组件重新渲染。尽量避免这样做，而是将对象的创建放在组件外部或使用 Reselect。

3. 使用 PureComponent 或 React.memo

   PureComponent 和 React.memo 都可以避免不必要的重新渲染。它们通过对比新旧 props 来决定是否更新组件。在使用这两者之前，请确保组件的 props 是不可变的。

4. 优化 Redux 中间件

   中间件可能会影响性能，尤其是在处理大量 action 时。确保你正在使用的中间件是高效的，并考虑移除不必要的中间件。

5. 拆分 reducer

   将一个大的 reducer 拆分成多个小的 reducer 可以提高性能。这样做可以减少每个 reducer 的复杂性，并减少不必要的状态更新。

6. 使用批处理处理多个 action

   当需要同时处理多个 action 时，可以使用 redux-batched-actions 库将这些 action 批处理。这样可以减少组件的重新渲染次数。

7. 避免过度使用 Redux

   并非所有状态都需要存储在 Redux 中。只有需要在多个组件之间共享的状态才应该放在 Redux 中。对于其他状态，可以考虑使用组件内部的 state。

8. 避免store深层次嵌套

   store层级不要太深，不然每次更新会导致需要更新的数据太多。（因为redux底层是基于不可变数据处理的）

### redux三大原则

- **单一事实来源**：整个应用程序的状态存储在单个存储中的对象树中。
- **状态是只读的**：改变状态的唯一方法是发出一个动作，一个描述发生了什么的对象。
- **使用纯函数进行更改**：要指定状态树如何通过操作进行转换，您可以编写纯减速器。
- 

### redux的优势

1. 强制使用 action 来描述所有变化可以让我们清晰地知道应用中到底发生了什么。如果一些东西改变了，就可以知道为什么变。actions 就像是描述所发生事情的面包屑导航。 最终，我们开发一个函数将 action 和 state 联系起来，这个函数就是 reducer。同样，这也没有使用什么魔法，reducer 只是一个接收 state 和 action作为其参数，并返回给应用新的 state 的函数。 对于大的应用来说，不大可能仅仅只写一个这样的函数，所以我们编写很多小函数来分别管理 state 的一部分：