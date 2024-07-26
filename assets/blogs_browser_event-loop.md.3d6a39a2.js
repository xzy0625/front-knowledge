import{_ as s,o,c as l,U as a}from"./chunks/framework.11867af4.js";const n="/front-knowledge/assets/image-20231219115000697.d98d3760.png",e="/front-knowledge/assets/640.6bbcafc8.png",p="/front-knowledge/assets/640-20231219115211885.12c761f9.png",c="/front-knowledge/assets/640.e2b830be.gif",t="/front-knowledge/assets/640-20231219115212095.1bb7d7fc.gif",r="/front-knowledge/assets/640-20231219115211942.65c523ca.gif",i="/front-knowledge/assets/640-20231219115211862.e8cbc0f9.png",f=JSON.parse('{"title":"从多线程角度来看 Event Loop","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/browser/event-loop.md","filePath":"blogs/browser/event-loop.md","lastUpdated":1721965436000}'),d={name:"blogs/browser/event-loop.md"},y=a('<h1 id="从多线程角度来看-event-loop" tabindex="-1">从多线程角度来看 Event Loop <a class="header-anchor" href="#从多线程角度来看-event-loop" aria-label="Permalink to &quot;从多线程角度来看 Event Loop&quot;">​</a></h1><h2 id="引言" tabindex="-1">引言 <a class="header-anchor" href="#引言" aria-label="Permalink to &quot;引言&quot;">​</a></h2><p>几乎在每一本JS相关的书籍中，都会说JS是 <code>单线程</code>的，JS是通过事件队列 <code>(EventLoop)</code>的方式来实现异步回调的。对很多初学JS的人来说，根本搞不清楚单线程的JS为什么拥有 <code>异步</code>的能力，所以，我试图从 <code>进程</code>、 <code>线程</code>的角度来解释这个问题。</p><h2 id="前置知识" tabindex="-1">前置知识 <a class="header-anchor" href="#前置知识" aria-label="Permalink to &quot;前置知识&quot;">​</a></h2><h3 id="cpu" tabindex="-1">CPU <a class="header-anchor" href="#cpu" aria-label="Permalink to &quot;CPU&quot;">​</a></h3><p>算机的核心是 <code>CPU</code>，它承担了所有的计算任务。它就像一座工厂，时刻在运行。</p><h3 id="进程" tabindex="-1">进程 <a class="header-anchor" href="#进程" aria-label="Permalink to &quot;进程&quot;">​</a></h3><p>定工厂的电力有限，一次只能供给一个车间使用。也就是说，一个车间开工的时候，其他车间都必须停工。背后的含义就是，单个CPU一次只能运行一个任务。</p><p><code>进程</code>就好比工厂的车间，它代表CPU所能处理的单个任务。<code>进程</code>之间相互独立，任一时刻，CPU总是运行一个 <code>进程</code>，其他 <code>进程</code>处于非运行状态。CPU使用时间片轮转进度算法来实现同时运行多个 <code>进程</code>。</p><h3 id="线程" tabindex="-1">线程 <a class="header-anchor" href="#线程" aria-label="Permalink to &quot;线程&quot;">​</a></h3><p>个车间里，可以有很多工人，共享车间所有的资源，他们协同完成一个任务。</p><p><code>线程</code>就好比车间里的工人，一个 <code>进程</code>可以包括多个 <code>线程</code>，多个 <code>线程</code>共享 <code>进程</code>资源。</p><h3 id="cpu、进程、线程之间的关系" tabindex="-1">CPU、进程、线程之间的关系 <a class="header-anchor" href="#cpu、进程、线程之间的关系" aria-label="Permalink to &quot;CPU、进程、线程之间的关系&quot;">​</a></h3><ul><li>从上文我们已经简单了解了CPU、进程、线程，简单汇总一下。 <ul><li><code>进程</code>是cpu资源分配的最小单位（是能拥有资源和独立运行的最小单位）</li><li><code>线程</code>是cpu调度的最小单位（线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程）</li><li>不同 <code>进程</code>之间也可以通信，不过代价较大</li><li><code>单线程</code>与 <code>多线程</code>，都是指在一个 <code>进程</code>内的单和多</li></ul></li></ul><h2 id="浏览器是多进程的" tabindex="-1">浏览器是多进程的 <a class="header-anchor" href="#浏览器是多进程的" aria-label="Permalink to &quot;浏览器是多进程的&quot;">​</a></h2><p>我们已经知道了 <code>CPU</code>、 <code>进程</code>、 <code>线程</code>之间的关系，对于计算机来说，每一个应用程序都是一个 <code>进程</code>， 而每一个应用程序都会分别有很多的功能模块，这些功能模块实际上是通过 <code>子进程</code>来实现的。对于这种 <code>子进程</code>的扩展方式，我们可以称这个应用程序是 <code>多进程</code>的。</p><p>而对于浏览器来说，浏览器就是多进程的，我在Chrome浏览器中打开了多个tab，然后打开控制管理器：</p><img src="'+n+'" alt="image-20231219115000697" style="zoom:50%;"><p>上图，我们可以看到一个Chrome浏览器启动了好多个进程。</p><p>总结一下：</p><ul><li>浏览器是多进程的</li><li>每一个Tab页，就是一个独立的进程</li></ul><h2 id="浏览器包含了哪些进程" tabindex="-1">浏览器包含了哪些进程 <a class="header-anchor" href="#浏览器包含了哪些进程" aria-label="Permalink to &quot;浏览器包含了哪些进程&quot;">​</a></h2><ul><li><p>主进程</p></li><li><ul><li>协调控制其他子进程（创建、销毁）</li><li>浏览器界面显示，用户交互，前进、后退、收藏</li><li>将渲染进程得到的内存中的Bitmap，绘制到用户界面上</li><li>处理不可见操作，网络请求，文件访问等</li></ul></li><li><p>第三方插件进程</p></li><li><ul><li>每种类型的插件对应一个进程，仅当使用该插件时才创建</li></ul></li><li><p>GPU进程</p></li><li><ul><li>用于3D绘制等</li></ul></li><li><p><code>渲染进程</code>，就是我们说的 <code>浏览器内核</code></p></li><li><ul><li>负责页面渲染，脚本执行，事件处理等</li><li>每个tab页一个渲染进程</li></ul></li></ul><p>那么浏览器中包含了这么多的进程，那么对于普通的前端操作来说，最重要的是什么呢？</p><p>答案是 <code>渲染进程</code>，也就是我们常说的 <code>浏览器内核</code></p><h2 id="浏览器内核-渲染进程" tabindex="-1">浏览器内核（渲染进程） <a class="header-anchor" href="#浏览器内核-渲染进程" aria-label="Permalink to &quot;浏览器内核（渲染进程）&quot;">​</a></h2><p>从前文我们得知，进程和线程是一对多的关系，也就是说一个进程包含了多条线程。</p><p>而对于 <code>渲染进程</code>来说，它当然也是多线程的了，接下来我们来看一下渲染进程包含哪些线程。</p><ul><li><p><code>GUI渲染线程</code></p></li><li><ul><li>负责渲染页面，布局和绘制</li><li>页面需要重绘和回流时，该线程就会执行</li><li>与js引擎线程互斥，防止渲染结果不可预期</li></ul></li><li><p><code>JS引擎线程</code></p></li><li><ul><li>负责处理解析和执行javascript脚本程序</li><li>只有一个JS引擎线程（单线程）</li><li>与GUI渲染线程互斥，防止渲染结果不可预期</li></ul></li><li><p><code>事件触发线程</code></p></li><li><ul><li>用来控制事件循环（鼠标点击、setTimeout、ajax等）</li><li>当事件满足触发条件时，将事件放入到JS引擎所在的执行队列中</li></ul></li><li><p><code>定时触发器线程</code></p></li><li><ul><li>setInterval与setTimeout所在的线程</li><li>定时任务并不是由JS引擎计时的，是由定时触发线程来计时的</li><li>计时完毕后，通知事件触发线程</li></ul></li><li><p><code>异步http请求线程</code></p></li><li><ul><li>浏览器有一个单独的线程用于处理AJAX请求</li><li>当请求完成时，若有回调函数，通知事件触发线程</li></ul></li></ul><p>当我们了解了渲染进程包含的这些线程后，我们思考两个问题：</p><ol><li>为什么 javascript 是单线程的</li><li>为什么 GUI 渲染线程与 JS 引擎线程互斥</li></ol><h3 id="为什么-javascript-是单线程的" tabindex="-1">为什么 javascript 是单线程的 <a class="header-anchor" href="#为什么-javascript-是单线程的" aria-label="Permalink to &quot;为什么 javascript 是单线程的&quot;">​</a></h3><p>首先是历史原因，在创建 javascript 这门语言时，多进程多线程的架构并不流行，硬件支持并不好。</p><p>其次是因为多线程的复杂性，多线程操作需要加锁，编码的复杂性会增高。</p><p>而且，如果同时操作 DOM ，在多线程不加锁的情况下，最终会导致 DOM 渲染的结果不可预期。</p><h3 id="为什么-gui-渲染线程为什么与-js-引擎线程互斥" tabindex="-1">为什么 GUI 渲染线程为什么与 JS 引擎线程互斥 <a class="header-anchor" href="#为什么-gui-渲染线程为什么与-js-引擎线程互斥" aria-label="Permalink to &quot;为什么 GUI 渲染线程为什么与 JS 引擎线程互斥&quot;">​</a></h3><p>这是由于 JS 是可以操作 DOM 的，如果同时修改元素属性并同时渲染界面(即 <code>JS线程</code>和 <code>UI线程</code>同时运行)， 那么渲染线程前后获得的元素就可能不一致了。</p><p>因此，为了防止渲染出现不可预期的结果，浏览器设定 <code>GUI渲染线程</code>和 <code>JS引擎线程</code>为互斥关系， 当 <code>JS引擎线程</code>执行时 <code>GUI渲染线程</code>会被挂起，GUI更新则会被保存在一个队列中等待 <code>JS引擎线程</code>空闲时立即被执行。</p><h2 id="从-event-loop-看-js-的运行机制" tabindex="-1">从 Event Loop 看 JS 的运行机制 <a class="header-anchor" href="#从-event-loop-看-js-的运行机制" aria-label="Permalink to &quot;从 Event Loop 看 JS 的运行机制&quot;">​</a></h2><p>到了这里，终于要进入我们的主题，什么是 Event Loop</p><p>先理解一些概念：</p><ul><li>JS 分为同步任务和异步任务</li><li>同步任务都在JS引擎线程上执行，形成一个 <code>执行栈</code></li><li>事件触发线程管理一个 <code>任务队列</code>，异步任务触发条件达成，将回调事件放到 <code>任务队列</code>中</li><li><code>执行栈</code>中所有同步任务执行完毕，此时JS引擎线程空闲，系统会读取 <code>任务队列</code>，将可运行的异步任务回调事件添加到 <code>执行栈</code>中，开始执行</li></ul><p><img src="'+e+'" alt="图片"></p><p>前端开发中我们会通过 <code>setTimeout/setInterval</code>来指定定时任务，会通过 <code>XHR/fetch</code>发送网络请求， 接下来简述一下 <code>setTimeout/setInterval</code>和 <code>XHR/fetch</code>到底做了什么事</p><p>我们知道，不管是 <code>setTimeout/setInterval</code>和 <code>XHR/fetch</code>代码，在这些代码执行时， 本身是同步任务，而其中的回调函数才是异步任务。</p><p>当代码执行到 <code>setTimeout/setInterval</code>时，实际上是 <code>JS引擎线程</code>通知 <code>定时触发器线程</code>，间隔一个时间后，会触发一个回调事件， 而 <code>定时触发器线程</code>在接收到这个消息后，会在等待的时间后，将回调事件放入到由 <code>事件触发线程</code>所管理的 <code>事件队列</code>中。</p><p>当代码执行到 <code>XHR/fetch</code>时，实际上是 <code>JS引擎线程</code>通知 <code>异步http请求线程</code>，发送一个网络请求，并制定请求完成后的回调事件， 而 <code>异步http请求线程</code>在接收到这个消息后，会在请求成功后，将回调事件放入到由 <code>事件触发线程</code>所管理的 <code>事件队列</code>中。</p><p>当我们的同步任务执行完， <code>JS引擎线程</code>会询问 <code>事件触发线程</code>，在 <code>事件队列</code>中是否有待执行的回调函数，如果有就会加入到执行栈中交给 <code>JS引擎线程</code>执行</p><p>用一张图来解释：</p><p><img src="'+p+`" alt="图片"></p><p>用代码来解释一下：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> timerCallback </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">wait one second</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> httpCallback </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">get server data success</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 同步任务</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hello</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 同步任务</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 通知定时器线程 1s 后将 timerCallback 交由事件触发线程处理</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1s 后事件触发线程将 timerCallback 加入到事件队列中</span></span>
<span class="line"><span style="color:#82AAFF;">setTimeout</span><span style="color:#A6ACCD;">(timerCallback</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 同步任务</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 通知异步http请求线程发送网络请求，请求成功后将 httpCallback 交由事件触发线程处理</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 请求成功后事件触发线程将 httpCallback 加入到事件队列中</span></span>
<span class="line"><span style="color:#A6ACCD;">$</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">www.xxxx.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> httpCallback)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 同步任务</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">world</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//...</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 所有同步任务执行完后</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 询问事件触发线程在事件事件队列中是否有需要执行的回调函数</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 如果没有，一直询问，直到有为止</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 如果有，将回调事件加入执行栈中，开始执行回调代码</span></span></code></pre></div><p>总结一下：</p><ul><li>JS引擎线程只执行执行栈中的事件</li><li>执行栈中的代码执行完毕，就会读取事件队列中的事件</li><li>事件队列中的回调事件，是由各自线程插入到事件队列中的</li><li>如此循环</li></ul><h2 id="宏任务、微任务" tabindex="-1">宏任务、微任务 <a class="header-anchor" href="#宏任务、微任务" aria-label="Permalink to &quot;宏任务、微任务&quot;">​</a></h2><p>当我们基本了解了什么是执行栈，什么是事件队列之后，我们深入了解一下事件循环中 <code>宏任务</code>、 <code>微任务</code></p><h3 id="什么是宏任务" tabindex="-1">什么是宏任务 <a class="header-anchor" href="#什么是宏任务" aria-label="Permalink to &quot;什么是宏任务&quot;">​</a></h3><p>我们可以将每次执行栈执行的代码当做是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）， 每一个宏任务会从头到尾执行完毕，不会执行其他。</p><p>我们前文提到过 <code>JS引擎线程</code>和 <code>GUI渲染线程</code>是互斥的关系，浏览器为了能够使 <code>宏任务</code>和 <code>DOM任务</code>有序的进行，会在一个 <code>宏任务</code>执行结果后，在下一个 <code>宏任务</code>执行前， <code>GUI渲染线程</code>开始工作，对页面进行渲染。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 宏任务--&gt;渲染--&gt;宏任务--&gt;渲染．．．</span></span></code></pre></div><p>主代码块，setTimeout，setInterval等，都属于宏任务</p><p><strong>第一个例子：</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">background:black</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">background:red</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">background:blue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">background:grey</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>我们可以将这段代码放到浏览器的控制台执行以下，看一下效果：</p><p><img src="`+c+`" alt="图片"></p><p>我们会看到的结果是，页面背景会在瞬间变成白色，以上代码属于同一次 <code>宏任务</code>，所以全部执行完才触发 <code>页面渲染</code>，渲染时 <code>GUI线程</code>会将所有UI改动优化合并，所以视觉效果上，只会看到页面变成灰色。</p><p><strong>第二个例子：</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">background:blue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">setTimeout</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">background:black</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>执行一下，再看效果：</p><p><img src="`+t+`" alt="图片"></p><p>我会看到，页面先显示成蓝色背景，然后瞬间变成了黑色背景，这是因为以上代码属于两次 <code>宏任务</code>，第一次 <code>宏任务</code>执行的代码是将背景变成蓝色，然后触发渲染，将页面变成蓝色，再触发第二次宏任务将背景变成黑色。</p><h3 id="什么是微任务" tabindex="-1">什么是微任务 <a class="header-anchor" href="#什么是微任务" aria-label="Permalink to &quot;什么是微任务&quot;">​</a></h3><p>我们已经知道 <code>宏任务</code>结束后，会执行渲染，然后执行下一个 <code>宏任务</code>， 而微任务可以理解成在当前 <code>宏任务</code>执行后立即执行的任务。</p><p>也就是说，当 <code>宏任务</code>执行完，会在渲染前，将执行期间所产生的所有 <code>微任务</code>都执行完。</p><p>Promise，process.nextTick等，属于 <code>微任务</code>。</p><p><strong>第一个例子：</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">background:blue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">background:black</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>执行一下，再看效果：</p><p><img src="`+r+`" alt="图片"></p><p>控制台输出 1 3 2 , 是因为 promise 对象的 then 方法的回调函数是异步执行，所以 2 最后输出</p><p>页面的背景色直接变成黑色，没有经过蓝色的阶段，是因为，我们在宏任务中将背景设置为蓝色，但在进行渲染前执行了微任务， 在微任务中将背景变成了黑色，然后才执行的渲染</p><p><strong>第二个例子：</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">setTimeout</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">3</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">setTimeout</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// print : 1 3 2</span></span></code></pre></div><p>上面代码共包含两个 setTimeout ，也就是说除主代码块外，共有两个 <code>宏任务</code>， 其中第一个 <code>宏任务</code>执行中，输出 1 ，并且创建了 <code>微任务队列</code>，所以在下一个 <code>宏任务</code>队列执行前， 先执行 <code>微任务</code>，在 <code>微任务</code>执行中，输出 3 ，微任务执行后，执行下一次 <code>宏任务</code>，执行中输出 2</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ul><li>执行一个 <code>宏任务</code>（栈中没有就从 <code>事件队列</code>中获取）</li><li>执行过程中如果遇到 <code>微任务</code>，就将它添加到 <code>微任务</code>的任务队列中</li><li><code>宏任务</code>执行完毕后，立即执行当前 <code>微任务队列</code>中的所有 <code>微任务</code>（依次执行）</li><li>当前 <code>宏任务</code>执行完毕，开始检查渲染，然后 <code>GUI线程</code>接管渲染</li><li>渲染完毕后， <code>JS线程</code>继续接管，开始下一个 <code>宏任务</code>（从事件队列中获取）</li></ul><p><img src="`+i+'" alt="图片"></p>',87),D=[y];function F(C,A,u,h,b,g){return o(),l("div",null,D)}const k=s(d,[["render",F]]);export{f as __pageData,k as default};
