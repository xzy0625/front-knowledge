# redux-react

## React状态管理库的核心命题

对于React的状态管理库来说，它的首要问题不是如何改变状态，而是如何触发更新。

不管是Mobx的observable，还是Redux的单向数据流，它们本身并不会绑定使用的框架或场景，因此不能直接用在React或其他MV*框架上。于是有了mobx-react和react-redux，将数据管理方案与react相结合。不管是那种数据管理方案，都一定会提供数据变更的观测方式，而观测到数据变更后如何更新，是这些react状态管理的核心命题。

在react中主动触发更新，无非是通过forceUpdate（Mobx）或setState。而其他比如change props，context，也都衍生于setState，因此可以看到react-redux5中，可以看到它为了触发更新，创建了一个dumb state（一个空对象`{}`）。

## 核心原理

`react-redux` 通过 [react context](https://link.juejin.cn?target=https%3A%2F%2Freact.dev%2Flearn%2Fpassing-data-deeply-with-context) 在子组件中注入 `store`, 使得在每个组件中通能拿到 `store`, 从而获取数据, 派发 `action`。 所以使用 `react-redux` 主要有以下步骤：

1. 创建 `store`,
2. 从 `react-redux` 中导入 `Provider` 并包裹根组件 `App`，并将创建的`store`作为`props`传入`Provider`中
3. 在函数组件中通过hooks `useSelector`并传入一个`selector`函数，这样就能获取 `state` 中的某个计算值, 并且在 `state` 改变时能够使组件重新 `render`
4. 在函数组件中通过hooks `useDispatch`可以拿到`dispatch`函数，通过`dispatch`函数派发`action`从而改变`store`中的状态。状态变更就会触发`useSelector`的重新`render`

## 实现更新

监听`store`的变化有很多中方式，例如`store.subscribe`添加监听器，在监听器中判断数据是否变更从而是否要触发渲染。

```js
import { useContext, useReducer, useLayoutEffect, useRef } from 'react';
import ReactReduxContext from '../ReactReduxContext';

function useSelectorWithStore(selector: Function, equalityFn: Function, store: any, subscription: any) {
  // 使用 useReducer 来让组件重新 render
  const [_, forceUpdate] = useReducer(x => x + 1, 0);
  
  // 使用 useRef 来记住上一次的计算值，从而和最新的计算值进行比较从而决定是否需要重新 render 组件
  const lastSelectedState = useRef();

  let selectedState = selector(store.getState());

  if (lastSelectedState.current !== undefined && !equalityFn(lastSelectedState.current, selectedState)) {
    selectedState = lastSelectedState.current;
  }

  useLayoutEffect(() => {
    lastSelectedState.current = selectedState
  })

  useLayoutEffect(() => {
    // 注册 store 变更的事件，在 store 变更之后比较前后两次 selector 函数的返回值是否相同，如果不同的话重新 render 组件
    const unsubscribe = subscription.subscribe(() => {
      const newSelectedState = selector(store.getState());
      // 判断是否相同
      if (equalityFn(lastSelectedState.current, newSelectedState)) {
        return;
      }
      forceUpdate();
      lastSelectedState.current = newSelectedState
    });
    return unsubscribe;
  }, [store, subscription]);

  return selectedState;
}

const refEquality = (a: any, b: any) => a === b

/**
 * useSelector 接收两个参数一个是 selector 函数用于计算你想要的 store 中的数据
 * 一个是 equalityFn, 这个函数用于在 store 中的数据发生变化时调用这个equalityFn函数根据返回值比较前后两次的计算值是否相同，如果不相同则重新 render 组件
 */
export default function useSelector(selector: Function, equalityFn = refEquality) {
  const { store, subscription } = useContext(ReactReduxContext);

  const selectedState = useSelectorWithStore(
    selector, equalityFn, store, subscription,
  );

  return selectedState;
}

```

触发渲染就是通过`forceUpdate`或者`setState`。

## useSyncExternalStore

`react18`提供了`useSyncExternalStore`函数可以更加方便的我们订阅外部数据从而更新。

## usesyncexternalstore

### 使用示例

https://react.dev/reference/react/useSyncExternalStore#subscribing-to-an-external-store 查看里面的代码示例

例如我们定义如下外部数据：

```js
let store = {
  x: 0,
  y: 0
}
function getSnapshot() {
  return store;
  // 请不要返回如下形式，这会导致无限执行
  // return {}
}
```

接下来我们需要做的事情，就是在组件外部定义一个 subscribe，这个 subscribe 是最难理解的一个方法。他的主要作用是接收一个回调函数 `callback` 作为参数，并将其订阅到 store 上。我们需要做的事情就是，**当 store 发生变化时，**`**callback**` **需要被执行**。这里官方文档没有说明的一个信息，也是造成他理解困难的重要因素，这个信息是：`callback` 由 react 内部传递而来(`handleStoreChange`)，他的主要作用是执行内部的 `forceStoreRerender(fiber)` 方法，以强制触发 UI 的更新。因此基础逻辑为

> store 改变 -> callback 执行 -> forceStoreRerender 执行

```js
function subscribe(callback) {
  window.addEventListener('resize', (e) => {
    store = { x: e.currentTarget.outerWidth, y: e.currentTarget.outerHeight }
    callback()
  });
  return () => {
    window.removeEventListener('resize', callback);
  };
}
```

在组件内部，我们只需要调用 useSyncExternalStore 即可，他会返回 getSnapshot 的执行结果。这个案例中，我们订阅的是 `resize` 事件，因此当我们改变窗口大小，`resize` 事件触发，在其回调中，我们修改了 store，并执行了 subscribe 的 callback。此时 UI 强制刷新，对应的节点会重新执行，节点函数执行时，通过 useSyncExternalStore 得到新的 store 快照，因此 UI 上能响应到最新的数据结果。



### usesyncexternalstore

```typescript
const HooksDispatcherOnMount: Dispatcher = {
  readContext,
  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useInsertionEffect: mountInsertionEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  useDebugValue: mountDebugValue,
  useDeferredValue: mountDeferredValue,
  useTransition: mountTransition,
  useMutableSource: mountMutableSource,
  useSyncExternalStore: mountSyncExternalStore,
  useId: mountId,

  unstable_isNewReconciler: enableNewReconciler,
};
```

### mountSyncExternalStore

```typescript
function mountSyncExternalStore<T>(
  subscribe: (() => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T,
): T {
  const fiber = currentlyRenderingFiber;
  const hook = mountWorkInProgressHook();

  let nextSnapshot;
  const isHydrating = getIsHydrating();
  if (isHydrating) {
    if (getServerSnapshot === undefined) {
      throw new Error(
        'Missing getServerSnapshot, which is required for ' +
          'server-rendered content. Will revert to client rendering.',
      );
    }
    nextSnapshot = getServerSnapshot();
  } else {
    nextSnapshot = getSnapshot();
    const root: FiberRoot | null = getWorkInProgressRoot();

    if (root === null) {
      throw new Error(
        'Expected a work-in-progress root. This is a bug in React. Please file an issue.',
      );
    }

    if (!includesBlockingLane(root, renderLanes)) {
      pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot);
    }
  }

  hook.memoizedState = nextSnapshot;
  const inst: StoreInstance<T> = {
    value: nextSnapshot,
    getSnapshot,
  };
  hook.queue = inst;

  mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [subscribe]); // 在这里将subscribeToStore绑定到subscribe中

  fiber.flags |= PassiveEffect;
  pushEffect(
    HookHasEffect | HookPassive,
    updateStoreInstance.bind(null, fiber, inst, nextSnapshot, getSnapshot),
    undefined,
    null,
  );

  return nextSnapshot;
}
```

### subscribeToStore

`checkIfSnapshotChanged`判断当前的`state`数据是不是改变了，这个`state`就是我们传给`usesyncexternalstore`的第二个参数。

同时会调用第一个函数`subscribe`。将我们的判断逻辑加到`store`的`listener`中去

```typescript
function subscribeToStore(fiber, inst, subscribe) {
  const handleStoreChange = () => {
    // The store changed. Check if the snapshot changed since the last time we
    // read from the store.
    if (checkIfSnapshotChanged(inst)) { // 判断当前的state数据是不是改变了，
      // Force a re-render.
      forceStoreRerender(fiber);
    }
  };
  // Subscribe to the store and return a clean-up function.
  return subscribe(handleStoreChange);
}
```

### 总结

所以整体流程如下：

1. `useSelector / connect`将`store.subscribe`和`getSnapshot`作为参数传递给`useSyncExternalStore`。在`useSyncExternalStore`内部会调用`store.subscribe`并传入更新函数(`handleStoreChange`)，这样相当于我们的更新函数订阅了`store`的变化。
2. 当`store`发生变化的时候就会调用我们更新函数`handleStoreChange`。在里面会判断`getSnapshot`的值是不是发生变化，发生变化了的话就在对应的函数`fiber`上进行