import{_ as s,o as n,c as a,U as l}from"./chunks/framework.11867af4.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/thinking/函数编程范式.md","filePath":"blogs/thinking/函数编程范式.md","lastUpdated":1721965436000}'),p={name:"blogs/thinking/函数编程范式.md"},o=l(`<p><a href="https://juejin.cn/post/6844903774214062093?searchId=202403071540437F50F86ECE309E53867B" target="_blank" rel="noreferrer">https://juejin.cn/post/6844903774214062093?searchId=202403071540437F50F86ECE309E53867B</a></p><p>前端函数式编程范式是一种编程范式，它强调使用函数和表达式来描述程序的逻辑，而不是使用命令式的语句和更改状态。在这种范式中，函数被视为一等公民，可以作为参数传递给其他函数，也可以作为其他函数的返回值。函数式编程范式在前端领域越来越受欢迎，因为它可以带来更好的代码可读性、可维护性和扩展性。</p><p>前端函数式编程范式的一些核心特性包括：</p><ol><li><p>纯函数：纯函数是指不依赖于外部状态、不改变外部状态的函数。纯函数的输出完全取决于输入，使得它们具有很高的可预测性和可测试性。</p></li><li><p>不变性：在函数式编程中，数据结构通常是不可变的。这意味着一旦创建了一个数据结构，它就不能被修改。不变性有助于降低程序的复杂性，因为你不需要担心数据在程序的执行过程中被意外修改。</p></li><li><p>高阶函数：高阶函数是指接受其他函数作为参数或返回其他函数的函数。高阶函数使得你可以更容易地创建复用和组合的函数逻辑，提高代码的抽象程度。</p></li><li><p>函数组合：函数式编程鼓励将多个简单的函数组合成一个更复杂的函数，以实现程序的逻辑。这种方式可以使代码更加模块化和可读。</p></li><li><p>递归：由于函数式编程避免使用可变状态，循环通常被递归所替代。递归是一种在函数内部调用自身的技巧，可以用来解决许多问题。</p></li><li><p>惰性求值：函数式编程中的一种策略是惰性求值，它允许推迟计算的执行，直到结果真正需要时才进行。这可以提高程序的性能，特别是在处理大量数据或计算密集型任务时。</p></li></ol><p>在前端开发中，许多流行的库和框架（如React、Redux、RxJS等）都采用了函数式编程范式。通过使用函数式编程范式，前端开发者可以更容易地编写可读、可维护和可扩展的代码。以下是一些例子：</p><ol><li>纯函数：</li></ol><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 纯函数：根据输入计算平方</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">square</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 使用纯函数</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> result </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">square</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 输出：25</span></span></code></pre></div><ol start="2"><li>不变性：</li></ol><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 使用 Object.freeze() 创建一个不可变对象</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> person </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">freeze</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Alice</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">age</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 尝试修改不可变对象的属性会失败</span></span>
<span class="line"><span style="color:#A6ACCD;">person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">age </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">31</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 报错：TypeError: Cannot assign to read-only property &#39;age&#39; of object</span></span></code></pre></div><ol start="3"><li>高阶函数：</li></ol><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 高阶函数：接受一个函数作为参数，返回一个新函数</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createMultiplier</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">multiplier</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">multiplier</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 使用高阶函数</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> double </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createMultiplier</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> triple </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createMultiplier</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">double</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 输出：10</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">triple</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 输出：15</span></span></code></pre></div><ol start="4"><li>函数组合：</li></ol><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 简单的函数</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">add</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">y</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">y</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">square</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 函数组合：将两个简单函数组合成一个新函数</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">addAndSquare</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">y</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">square</span><span style="color:#F07178;">(</span><span style="color:#82AAFF;">add</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">y</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 使用组合函数</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">addAndSquare</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 输出：25</span></span></code></pre></div><ol start="5"><li>递归：</li></ol><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 使用递归计算阶乘</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">factorial</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">n</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">n</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">n</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">factorial</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">n</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 使用递归函数</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">factorial</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 输出：120</span></span></code></pre></div><ol start="6"><li>惰性求值：</li></ol><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 使用生成器函数实现惰性求值</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">fibonacci</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">prev</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">curr</span><span style="color:#89DDFF;">]</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> [</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;"> (</span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">yield</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">curr</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    [</span><span style="color:#A6ACCD;">prev</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">curr</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> [</span><span style="color:#A6ACCD;">curr</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">prev</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">curr</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 使用生成器函数进行惰性求值</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fib </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">fibonacci</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(fib</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 输出：1</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(fib</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 输出：1</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(fib</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">next</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 输出：2</span></span></code></pre></div><p>这些示例展示了函数式编程特性在实际代码中的应用。通过使用这些特性，你可以编写更加简洁、可读和可维护的前端代码。</p>`,18),t=[o];function e(c,r,y,F,D,A){return n(),a("div",null,t)}const f=s(p,[["render",e]]);export{C as __pageData,f as default};
