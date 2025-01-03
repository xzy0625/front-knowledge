# 为什么用rollup

## rollup的优势
rollup虽然它不如 webpack、vite 提到的多，但也是一个常用的打包工具。
**它打包产物没有 runtime 代码，更简洁纯粹，能打包出 esm、cjs、umd 的产物，常用来做 js 库、组件库的打包。**相比之下，webpack 目前对 esm 产物的支持还是实验性的，不稳定。
rollup 只有 plugin，没有 loader，因为它的 transform 方法就相当于 webpack 插件的 loader。
vite 就是基于 rollup 来实现的，开发环境用 rollup 插件的 transform 来做代码转换，生产环境用 rollup 打包。
不管你是想做组件库、js 库的打包，还是想深入学习 vite，都离不开 rollup。
