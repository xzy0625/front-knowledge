# this指向规则

## `this`的5种绑定方式：

- 默认绑定(非严格模式下this指向全局对象, 严格模式下`this`会绑定到`undefined`)
- 隐式绑定(当函数引用有**上下文对象**时, 如 `obj.foo()`的调用方式, `foo`内的`this`指向`obj`)
- 显示绑定(通过`call()`或者`apply()`方法直接指定`this`的绑定对象, 如`foo.call(obj)`)
- new绑定
- 箭头函数绑定(`this`的指向由外层作用域决定的)

### 一：默认绑定

在非严格模式下`this`指向的是全局对象`window`，而在严格模式下会绑定到`undefined`。

### 二：隐式绑定

**this 永远指向最后调用它的那个对象**。

谁最后调用的函数，函数内的`this`指向的就是谁(不考虑箭头函数)。不过需要考虑**隐式丢失问题**。

> 隐式丢失其实就是被隐式绑定的函数在特定的情况下会丢失绑定对象。

有两种情况容易发生隐式丢失问题：（其实也可以用最后调用的是哪个对象来判断）

- 使用另一个变量来给函数取别名

  ```js
  function foo () {
    console.log(this.a)
  };
  var obj = { a: 1, foo };
  var a = 2;
  var foo2 = obj.foo;
  
  obj.foo();
  foo2();
  ```

- 将函数作为参数传递时会被隐式赋值，回调函数丢失this绑定

  ```js
  function foo () {
    console.log(this.a)
  }
  function doFoo (fn) {
    console.log(this)
    fn()
  }
  var obj = { a: 1, foo }
  var a = 2
  var obj2 = { a: 3, doFoo }
  
  obj2.doFoo(obj.foo)
  ```

  ```js
  var obj1 = {
    a: 1
  }
  var obj2 = {
    a: 2,
    foo1: function () {
      console.log(this.a)
    },
    foo2: function () {
      setTimeout(function () {
        console.log(this)
        console.log(this.a)
      }, 0)
    }
  }
  var a = 3
  
  obj2.foo1()
  obj2.foo2()
  ```

  对于`setTimeout`中的函数，这里存在隐式绑定的隐式丢失，也就是当我们将函数作为参数传递时会被隐式赋值，回调函数丢失`this`绑定，因此这时候`setTimeout`中的函数内的`this`是指向`window`的。

### 三：显示绑定

功能如其名，就是强行使用某些方法，改变函数内`this`的指向。

通过`call()、apply()`或者`bind()`方法直接指定`this`的绑定对象, 如`foo.call(obj)`。

这里有几个知识点需要注意：

- 使用`.call()`或者`.apply()`的函数是会直接执行的
- `bind()`是创建一个新的函数，需要手动调用才会执行
- `.call()`和`.apply()`用法基本类似，不过`call`接收若干个参数，而`apply`接收的是一个数组

这里想要提一嘴，如果`call、apply、bind`接收到的第一个参数是空或者`null、undefined`的话，则会忽略这个参数。

```js
function foo () {
  console.log(this.a)
}
var a = 2
foo.call()
foo.call(null)
foo.call(undefined)
// 输出 2 2 2
```

对于上面隐式绑定丢失的就可以使用显示绑定

```js
var obj1 = {
  a: 1
}
var obj2 = {
  a: 2,
  foo1: function () {
    console.log(this.a)
  },
  foo2: function () {
    setTimeout(function () {
      console.log(this)
      console.log(this.a)
    }.call(obj1), 0)
  }
}
var a = 3
obj2.foo1()
obj2.foo2()
```

#### 显示绑定的一些骚操作

1. 将某个函数的`this`绑定死

   ```js
   function foo1 () {
     console.log(this.a)
   }
   var a = 1
   var obj = {
     a: 2
   }
   
   var foo2 = function () { // 用函数包裹，然后call一下
     foo1.call(obj)
   }
   
   foo2()
   foo2.call(window)
   ```

总结一下：

- `this` 永远指向最后调用它的那个对象
- 匿名函数的`this`永远指向`window`
- 使用`.call()`或者`.apply()`的函数是会直接执行的
- `bind()`是创建一个新的函数，需要手动调用才会执行
- 如果`call、apply、bind`接收到的第一个参数是空或者`null、undefined`的话，则会忽略这个参数
- `forEach、map、filter`函数的第二个参数也是能显式绑定`this`的

### 四：new 绑定

使用`new`来调用一个函数，会构造一个新对象并把这个新对象绑定到调用函数中的`this`。

### 五：箭头函数绑定

在上面，我们有学到一个诀窍：**this 永远指向最后调用它的那个对象**。

但是对于箭头函数就不是这样咯，**它里面的`this`是由外层作用域来决定的，且指向函数定义时的this而非执行时**。

`它里面的this是由外层作用域来决定的`啥意思呢？来看看这句话：

> 箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined。

```js
var obj = {
  name: 'obj',
  foo1: () => {
    console.log(this.name)
  },
  foo2: function () {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  }
}
var name = 'window'
obj.foo1()
obj.foo2()()
```

这道题就非常有代表性，它明确了箭头函数内的`this`是由外层作用域决定的。

- 对于`obj.foo1()`函数的调用，它的外层作用域是`window`，对象`obj`当然不属于作用域了(我们知道作用域只有全局作用域`window`和局部作用域函数)。所以会打印出`window`
- `obj.foo2()()`，首先会执行`obj.foo2()`，这不是个箭头函数，所以它里面的`this`是调用它的`obj`对象，因此打印出`obj`，而返回的匿名函数是一个箭头函数，**它的`this`由外层作用域决定**，那也就是函数`foo2`咯，那也就是它的`this`会和`foo2`函数里的`this`一样，就也打印出了`obj`。

答案：

```bash
'window'
'obj'
'obj'
```

**构造函数对象中普通函数和箭头函数的区别：一层函数的题目**

```js
var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  }
  this.foo2 = () => { // 这也是为什么React class组件推荐箭头函数的写法吧
    console.log(this.name)
  }
}
var person2 = {
  name: 'person2',
  foo2: () => {
    console.log(this.name)
  }
}
var person1 = new Person('person1')
person1.foo1()
person1.foo2()
person2.foo2()
```

解题思路：

- `person1.foo1()`是个普通函数，**this由最后调用它的对象决定**，即`person1`。
- `person1.foo2()`为箭头函数，**this由外层作用域决定，且指向函数定义时的this而非执行时**，在这里它的外层作用域是函数`Person`，且这个是构造函数，并且使用了`new`来生成了对象`person1`，所以此时`this`的指向是为`person1`。
- `person2.foo2()`字面量创建的的对象`person2`中的`foo2`是个箭头函数，由于`person2`是直接在`window`下创建的，你可以理解为它所在的作用域就是在`window`下，因此`person2.foo2()`内的`this`应该是`window`。

#### 注意

箭头函数的`this`无法通过`bind、call、apply`来**直接**修改，但是可以通过改变作用域中`this`的指向来间接修改。所以虽然说箭头函数是定义时就决定了`this`的指向，但是如果外层包的是一个普通函数的话，普通函数的`this`是会变的。

```js
var name = 'window'
var obj1 = {
  name: 'obj1',
  foo1: function () {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  },
  foo2: () => {
    console.log(this.name)
    return function () {
      console.log(this.name)
    }
  }
}
var obj2 = {
  name: 'obj2'
}
obj1.foo1.call(obj2)()
obj1.foo1().call(obj2)
obj1.foo2.call(obj2)()
obj1.foo2().call(obj2)
```

`obj1.foo1.call(obj2)()`第一层为普通函数，并且通过`.call`改变了`this`指向为`obj2`，所以会打印出`obj2`，第二层为箭头函数，它的`this`和外层作用域中的`this`相同，因此也是`obj2`。

`obj1.foo().call(obj2)`第一层打印出`obj1`，第二层为箭头函数，使用了`.call`想要修改`this`的指向，但是并不能成功，因此`.call(obj2)`对箭头函数无效，还是打印出`obj1`。

`obj1.foo2.call(obj2)()`第一层为箭头函数，并且想要通过`.call(obj2)`改变`this`指向，但是无效，且它的外层作用域是`window`，所以会打印出`window`，第二层为普通函数，`this`是最后调用者`window`，所以也会打印出`window`。

`obj1.foo2().call(obj2)`第一层为箭头函数，外层作用域是`window`，打印出`window`，第二层为普通函数，且使用了`.call(obj2)`来改变`this`指向，所以打印出了`obj2`。

#### 总结

- 它里面的`this`是由外层作用域来决定的，且指向函数定义时的`this`而非执行时
- 字面量创建的对象，作用域是`window`，如果里面有箭头函数属性的话，`this`指向的是`window`
- 构造函数创建的对象，作用域是可以理解为是这个构造函数，且这个构造函数的`this`是指向新建的对象的，因此`this`指向这个对象。
- 箭头函数的`this`是无法通过`bind、call、apply`来**直接**修改，但是可以通过改变作用域中`this`的指向来间接修改。

**优点**

- 箭头函数写代码拥有更加简洁的语法(当然也有人认为这是缺点)
- `this`由外层作用域决定，所以在某些场合我们不需要写类似`const that = this`这样的代码

## 参考

https://juejin.cn/post/6844904083707396109#heading-36