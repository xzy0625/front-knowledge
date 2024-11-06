# node实现路径别名

## 一：什么是路径别名

开发前端应用时，经常看到类似 **@utils/**，**@components/** 的引入路径，如：

``` ts
import request from '@utils/request'
```

通常这种引入路径就是路径别名，因为在实际的文件系统中，基本不会存在像 **@utils/** 的文件路径。如果你的项目中有用到，可以去查看 **Webpack/Vite** 配置文件是否配置了 [**resolve.alias**](https://cn.vitejs.dev/config/shared-options.html#resolve-alias)。配置了之后在构建的时候，这些别名会被这些打包框架替换为实际的文件路径，从而正确的找到文件。

所以路径别名，故名思意，就是为引入模块的路径定义一个新的、简化的名字，然后 **import/require** 时使用该别名作为引入路径，而程序运行时，别名路径会经由相关工具处理，转换为原始文件路径，以正确加载对应资源。

## 二：路径别名的作用
*   **提高可读性**，路径别名与某个目录或文件存在映射关系，引入的模块位于哪个目录，一目了然。
*   **提高编码效率**，一个别名可以到处使用，无论是文件结构嵌套多少层，相比之下，无数个 **../** 写起来麻烦还不好看。
*   **重构简单**，若项目结构变化，只需要修改别名配置即可，无需全局搜索挨个修改引入路径，极大的减少工作量。
*   **避免路径冲突**，在大型项目中可能存在相同的文件或目录，通过路径可以明确区分某个模块属于哪个目录。
*   **工具支持度高**，目前主流的构建工具，如 **vite**、**Webpack** 等，都支持路径别名配置。

## 三：客户端启用路径别名
在前端项目中启动路径别名只需要在打包工具中配置即可，如果项目中使用了`ts`，还需要额外的进行`tsconfig.json`配置。示例如下：
```json {3-7}
{
    ...
    "paths": {
        "@controllers/*": ["./src/controllers/*"],
        "@services/*": ["./src/services/*"],
        "@entities/*": ["./src/entities/*"],
    },
    ...
}
```

以上配置定义了几个路径别名：

*   **@controllers**：映射到 `./src/controllers` 目录。
*   **@services**：映射到 `./src/services` 目录。
*   **@entities**：映射到 `./src/entities` 目录。

比如引入 `import { UserController } from '@controllers/user.controller'`，实际引入的是 **./src/controllers/user.controller**。

### 路径映射规则：

*   若 `tsconfig.json` 配置了 [`baseUrl`](https://www.typescriptlang.org/tsconfig/#baseUrl)，则 [`paths`](https://www.typescriptlang.org/tsconfig/#paths) 配置的文件路径相对于 [`baseUrl`](https://www.typescriptlang.org/tsconfig/#baseUrl) 配置的路径；
    
*   若未配置 [`baseUrl`](https://www.typescriptlang.org/tsconfig/#baseUrl)，则相对于 `tsconfig.json` 文件位置。
    
## 四：node中集成路径别名
如果是在node环境下。就算配置了 `TypeScript`的`paths`，虽然`TypeScript`检验通过，但在程序运行时，仍然会报 "找不到模块" 的错误。这是因为在node中没有vite/webpack这些工具对路径别名做转换，所以对于路径别名文件系统没办法识别出来。要实现的话可以使用第三方包
### 集成 [`module-alias`](https://github.com/ilearnio/module-alias)

在node中可以使用**module-alias**来实现路径别名的效果，使用module-alias添加别名有两种方式：
> 1. 在package.json进行配置
> 2. 使用API进行动态添加别名
具体使用可以查看[官方文档](https://github.com/ilearnio/module-alias)

### module-alias 原理
`module-alias的`原理也非常简单，整个代码也就两百多行。主要原理是通过改写`Module._resolveFilename`模块查找的函数，内部维护一个moduleAliases映射，在进行路径解析的时候通过映射的方式找到真实的路径。

### module-alias 坑点
由于我们项目打包之后代码一般放在`dist`目录中，而开发的时候代码放在`src`目录下，所以会导致开发的时候路径可以找到，但是发布之后模块就会找不到。
```json
"_moduleAliases": {
  "@": "src" // 打包之后这里应该是dist
},
```
解决这个问题我们可以动态的注入路径，通过判断环境来实现不同的环境配置不同的根路径。
```js
import { isDev } from "./env";
import path from 'path';
import 'module-alias/register'

const { addAliases } = require("module-alias")

const initAlias = () => {
  const base = process.env.NODE_ENV === 'development' ? path.resolve(__dirname, '../../src') : path.resolve(__dirname, '../../dist/');

  // 配置路径别名
  addAliases({
    "@root": ".",
    "@controller": `${base}/controller`,
  });
}

initAlias();
```
然后在项目的入口引入这个文件即可。