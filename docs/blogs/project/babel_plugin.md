# babel插件

babel官网：https://babeljs.io/docs/

## babel是什么？

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 代码转换为当前和旧版浏览器或环境中的向后兼容版本的 JavaScript。它可以做以下事情：

- 变换语法
- 目标环境中缺少的 Polyfill 功能（通过第三方 Polyfill，例如[core-js](https://github.com/zloirock/core-js)）
- 源代码转换 (codemods)
- ...

值得一提的是，**babel只是提供了一个“平台”**，让更多有能力的plugins入驻平台，是这些plugins提供了各种各样的转换能力。

# babel的编译流程

主要分为三步，流程主要为：

**parsing（解析）、transforming（转化）、generating（生成）**

1. parsing: `@babel/parser` 负责将es6代码进行语法分析和词法分析后转换成抽象语法树AST
2. transforming: plugin插件使用 `@babel/traverse` 来遍历 AST 并进行节点的操作，用它提供的 API 来编写对 AST 的遍历和修改逻辑，由此来将一种AST转换为另一种AST
3. generating：`@babel/generator`负责通过AST树生成ES5代码

其中第二步的转化是重中之重，babel的插件机制也是在这一步发挥作用的，plugins在这里进行操作，转化成新的AST，再交给第三步的`@babel/generator`。 所以如果没有这些plugins进驻平台，那么babel这个“平台”是不具备任何能力的。

而这整个过程，由`@babel/core` 负责编译过程的控制和管理。它会调用其他模块来解析、转换和生成代码。



## 常见`plugin`和`Preset`

首先我们来说说`Plugin`和`Preset`的区别和联系。

**所谓`Preset`就是一些`Plugin`组成的合集**,你可以将`Preset`理解称为就是一些的`Plugin`整合称为的一个包。

### 常见`Preset`

文章中列举了三个最常用的`Preset`，更多的`Prest`[你可以在这里查阅](https://babeljs.io/docs/en/babel-preset-env)。

#### `babel-preset-env`

`@babel/preset-env`是一个智能预设，它可以将我们的高版本`JavaScript`代码进行转译根据内置的规则转译成为低版本的`javascript`代码。

`preset-env`内部集成了绝大多数`plugin`（`State > 3`）的转译插件，它会根据对应的参数进行代码转译。

具体的参数配置你可以在[这里看到](https://babeljs.io/docs/en/babel-preset-env#options)。

> `@babel/preset-env`不会包含任何低于 Stage 3 的 JavaScript 语法提案。如果需要兼容低于`Stage 3`阶段的语法则需要额外引入对应的`Plugin`进行兼容。

> 需要额外注意的是`babel-preset-env`仅仅针对语法阶段的转译，比如转译箭头函数，`const/let`语法。针对一些`Api`或者`Es 6`内置模块的`polyfill`，`preset-env`是无法进行转译的。这块内容我们会在之后的`polyfill`中为大家进行详细讲解。

#### `babel-preset-react`

通常我们在使用`React`中的`jsx`时，相信大家都明白实质上`jsx`最终会被编译称为`jsx()`方法。

`babel-preset-react`这个预设起到的就是将`jsx`进行转译的作用。

#### `babel-preset-typescript`

对于`TypeScript`代码，我们有两种方式去编译`TypeScript`代码成为`JavaScript`代码。

1. 使用`tsc`命令，结合`cli`命令行参数方式或者`tsconfig`配置文件进行编译`ts`代码。
2. 使用`babel`，通过`babel-preset-typescript`代码进行编译`ts`代码。

### 常见Plugin

`Babel`官网列举出了一份非常详尽的[Plugin List](https://babeljs.io/docs/plugins-list)。

关于常见的`Plugin`其实大多数都集成在了`babel-preset-env`中，当你发现你的项目中并不能支持最新的`js`语法时，此时我们可以查阅对应的`Babel Plugin List`找到对应的语法插件添加进入`babel`配置。

> 同时还有一些不常用的`packages`，比如`@babel/register`：它会改写`require`命令，为它加上一个钩子。此后，每当使用`require`加载`.js`、`.jsx`、`.es`和`.es6`后缀名的文件，就会先用Babel进行转码。

> 这些包日常中不是特别常用，如果有同学有相关编译相关需求完全可以去`babel`官网查阅。如果官网不存在现成的`plugin/package`，别担心！我们同时也会在之后手把手教大家`babel`插件的开发。

其中最常见的`@babel/plugin-transform-runtime`我们会在下面的`Polyfill`进行详细的讲解。

## 实现插件所需要的知识

- AST
  1. [AST基本讲解及参数](https://link.juejin.cn/?target=http%3A%2F%2Fwww.goyth.com%2F2018%2F12%2F23%2FAST%2F%23%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E4%BA%86%E8%A7%A3AST)
  2. [AST的在线编译工具](https://link.juejin.cn/?target=https%3A%2F%2Fastexplorer.net%2F)
- 编译原理知识以及babel的编译过程
  - [编译原理](https://link.juejin.cn/?target=https%3A%2F%2Fwww.icourse163.org%2Fcourse%2FHIT-1002123007%3Ftid%3D1002231003)
  - [babel及AST文档](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fjamiebuilds%2Fbabel-handbook%2Fblob%2Fmaster%2Ftranslations%2Fzh-Hans%2Fplugin-handbook.md)
- 英文阅读能力[@babel/types](https://link.juejin.cn/?target=https%3A%2F%2Fwww.babeljs.cn%2Fdocs%2Fbabel-types)。开发的过程中需要用到babel的类型，需要了解它的类型接使用方法

## 