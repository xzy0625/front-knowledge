import{_ as i,c as e,ag as a,o as l}from"./chunks/framework.iGf8PnRx.js";const c=JSON.parse('{"title":"promiseA+规范","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/jsvascript/promise/promiseA+规范.md","filePath":"blogs/jsvascript/promise/promiseA+规范.md","lastUpdated":1730877756000}'),n={name:"blogs/jsvascript/promise/promiseA+规范.md"};function h(t,s,p,o,r,k){return l(),e("div",null,s[0]||(s[0]=[a(`<h1 id="promisea-规范" tabindex="-1">promiseA+规范 <a class="header-anchor" href="#promisea-规范" aria-label="Permalink to &quot;promiseA+规范&quot;">​</a></h1><p>英文原文：<a href="https://promisesaplus.com/" target="_blank" rel="noreferrer">Promise/A+</a></p><p><strong>一个开放、健全且通用的 JavaScript Promise 标准。由开发者制定，供开发者参考。</strong></p><h2 id="译文术语" tabindex="-1">译文术语 <a class="header-anchor" href="#译文术语" aria-label="Permalink to &quot;译文术语&quot;">​</a></h2><ul><li><strong>解决（fulfill）</strong>：指一个 promise 成功时进行的一系列操作，如状态的改变、回调的执行。虽然规范中用 <code>fulfill</code> 来表示解决，但在后世的 promise 实现多以 <code>resolve</code> 来指代之。</li><li><strong>拒绝（reject）</strong>：指一个 promise 失败时进行的一系列操作。</li><li><strong>终值（eventual value）</strong>：所谓终值，指的是 promise 被<strong>解决</strong>时传递给解决回调的值，由于 promise 有<strong>一次性</strong>的特征，因此当这个值被传递时，标志着 promise 等待态的结束，故称之终值，有时也直接简称为值（value）。</li><li><strong>据因（reason）</strong>：也就是拒绝原因，指在 promise 被<strong>拒绝</strong>时传递给拒绝回调的值。</li></ul><hr><p>Promise 表示一个异步操作的最终结果，与之进行交互的方式主要是 <code>then</code> 方法，该方法注册了两个回调函数，用于接收 promise 的终值或本 promise 不能执行的原因。</p><p>本规范详细列出了 <code>then</code> 方法的执行过程，所有遵循 Promises/A+ 规范实现的 promise 均可以本标准作为参照基础来实施 <code>then</code> 方法。因而本规范是十分稳定的。尽管 Promise/A+ 组织有时可能会修订本规范，但主要是为了处理一些特殊的边界情况，且这些改动都是微小且向下兼容的。如果我们要进行大规模不兼容的更新，我们一定会在事先进行谨慎地考虑、详尽的探讨和严格的测试。</p><p>从历史上说，本规范实际上是把之前 <a href="http://wiki.commonjs.org/wiki/Promises/A" target="_blank" rel="noreferrer">Promise/A 规范</a> 中的建议明确成为了行为标准：我们一方面扩展了原有规范约定俗成的行为，一方面删减了原规范的一些特例情况和有问题的部分。</p><p>最后，核心的 Promises/A+ 规范不设计如何创建、解决和拒绝 promise，而是专注于提供一个通用的 <code>then</code> 方法。上述对于 promises 的操作方法将来在其他规范中可能会提及。</p><h2 id="术语" tabindex="-1">术语 <a class="header-anchor" href="#术语" aria-label="Permalink to &quot;术语&quot;">​</a></h2><h2 id="promise" tabindex="-1">Promise <a class="header-anchor" href="#promise" aria-label="Permalink to &quot;Promise&quot;">​</a></h2><p>promise 是一个拥有 <code>then</code> 方法的对象或函数，其行为符合本规范；</p><h2 id="thenable" tabindex="-1">thenable <a class="header-anchor" href="#thenable" aria-label="Permalink to &quot;thenable&quot;">​</a></h2><p>是一个定义了 <code>then</code> 方法的对象或函数，文中译作“拥有 <code>then</code> 方法”；</p><h2 id="值-value" tabindex="-1">值（value） <a class="header-anchor" href="#值-value" aria-label="Permalink to &quot;值（value）&quot;">​</a></h2><p>指任何 JavaScript 的合法值（包括 <code>undefined</code> , thenable 和 promise）；</p><h2 id="异常-exception" tabindex="-1">异常（exception） <a class="header-anchor" href="#异常-exception" aria-label="Permalink to &quot;异常（exception）&quot;">​</a></h2><p>是使用 <code>throw</code> 语句抛出的一个值。</p><h2 id="据因-reason" tabindex="-1">据因（reason） <a class="header-anchor" href="#据因-reason" aria-label="Permalink to &quot;据因（reason）&quot;">​</a></h2><p>表示一个 promise 的拒绝原因。</p><h2 id="要求" tabindex="-1">要求 <a class="header-anchor" href="#要求" aria-label="Permalink to &quot;要求&quot;">​</a></h2><h2 id="promise-的状态" tabindex="-1">Promise 的状态 <a class="header-anchor" href="#promise-的状态" aria-label="Permalink to &quot;Promise 的状态&quot;">​</a></h2><p>一个 Promise 的当前状态必须为以下三种状态中的一种：<strong>等待态（Pending）</strong>、<strong>执行态（Fulfilled）<strong>和</strong>拒绝态（Rejected）</strong>。</p><h3 id="等待态-pending" tabindex="-1">等待态（Pending） <a class="header-anchor" href="#等待态-pending" aria-label="Permalink to &quot;等待态（Pending）&quot;">​</a></h3><p>处于等待态时，promise 需满足以下条件：</p><ul><li>可以迁移至执行态或拒绝态</li></ul><h3 id="执行态-fulfilled" tabindex="-1">执行态（Fulfilled） <a class="header-anchor" href="#执行态-fulfilled" aria-label="Permalink to &quot;执行态（Fulfilled）&quot;">​</a></h3><p>处于执行态时，promise 需满足以下条件：</p><ul><li>不能迁移至其他任何状态</li><li>必须拥有一个<strong>不可变</strong>的终值</li></ul><h3 id="拒绝态-rejected" tabindex="-1">拒绝态（Rejected） <a class="header-anchor" href="#拒绝态-rejected" aria-label="Permalink to &quot;拒绝态（Rejected）&quot;">​</a></h3><p>处于拒绝态时，promise 需满足以下条件：</p><ul><li>不能迁移至其他任何状态</li><li>必须拥有一个<strong>不可变</strong>的据因</li></ul><p>这里的不可变指的是恒等（即可用 <code>===</code> 判断相等），而不是意味着更深层次的不可变（**译者注：**盖指当 value 或 reason 不是基本值时，只要求其引用地址相等，但属性值可被更改）。</p><h2 id="then-方法" tabindex="-1"><strong>Then 方法</strong> <a class="header-anchor" href="#then-方法" aria-label="Permalink to &quot;**Then 方法**&quot;">​</a></h2><p>一个 promise 必须提供一个 <code>then</code> 方法以访问其当前值、终值和据因。</p><p>promise 的 <code>then</code> 方法接受两个参数：</p><pre><code>promise.then(onFulfilled, onRejected)
</code></pre><h3 id="参数可选" tabindex="-1">参数可选 <a class="header-anchor" href="#参数可选" aria-label="Permalink to &quot;参数可选&quot;">​</a></h3><p><code>onFulfilled</code> 和 <code>onRejected</code> 都是可选参数。</p><ul><li>如果 <code>onFulfilled</code> 不是函数，其必须被忽略</li><li>如果 <code>onRejected</code> 不是函数，其必须被忽略</li></ul><h3 id="onfulfilled-特性" tabindex="-1"><code>onFulfilled</code> 特性 <a class="header-anchor" href="#onfulfilled-特性" aria-label="Permalink to &quot;\`onFulfilled\` 特性&quot;">​</a></h3><p>如果 <code>onFulfilled</code> 是函数：</p><ul><li>当 <code>promise</code> 执行结束后其必须被调用，其第一个参数为 <code>promise</code> 的终值</li><li>在 <code>promise</code> 执行结束前其不可被调用</li><li>其调用次数不可超过一次</li></ul><h3 id="onrejected-特性" tabindex="-1"><code>onRejected</code> 特性 <a class="header-anchor" href="#onrejected-特性" aria-label="Permalink to &quot;\`onRejected\` 特性&quot;">​</a></h3><p>如果 <code>onRejected</code> 是函数：</p><ul><li>当 <code>promise</code> 被拒绝执行后其必须被调用，其第一个参数为 <code>promise</code> 的据因</li><li>在 <code>promise</code> 被拒绝执行前其不可被调用</li><li>其调用次数不可超过一次</li></ul><h3 id="调用时机" tabindex="-1">调用时机 <a class="header-anchor" href="#调用时机" aria-label="Permalink to &quot;调用时机&quot;">​</a></h3><p><code>onFulfilled</code> 和 <code>onRejected</code> 只有在<a href="http://es5.github.io/#x10.3" target="_blank" rel="noreferrer">执行环境</a>堆栈仅包含<strong>平台代码</strong>时才可被调用 <a href="#note-1">注1</a></p><h3 id="调用要求" tabindex="-1">调用要求 <a class="header-anchor" href="#调用要求" aria-label="Permalink to &quot;调用要求&quot;">​</a></h3><p><code>onFulfilled</code> 和 <code>onRejected</code> 必须被作为函数调用（即没有 <code>this</code> 值）[注2][2]</p><h3 id="多次调用" tabindex="-1">多次调用 <a class="header-anchor" href="#多次调用" aria-label="Permalink to &quot;多次调用&quot;">​</a></h3><p><code>then</code> 方法可以被同一个 <code>promise</code> 调用多次</p><ul><li>当 <code>promise</code> 成功执行时，所有 <code>onFulfilled</code> 需按照其注册顺序依次回调</li><li>当 <code>promise</code> 被拒绝执行时，所有的 <code>onRejected</code> 需按照其注册顺序依次回调</li></ul><h3 id="返回" tabindex="-1">返回 <a class="header-anchor" href="#返回" aria-label="Permalink to &quot;返回&quot;">​</a></h3><p><code>then</code> 方法必须返回一个 <code>promise</code> 对象 [注3][3]</p><pre><code>promise2 = promise1.then(onFulfilled, onRejected);   
</code></pre><ul><li>如果 <code>onFulfilled</code> 或者 <code>onRejected</code> 返回一个值 <code>x</code> ，则运行下面的 <strong>Promise 解决过程</strong>：<code>[[Resolve]](promise2, x)</code></li><li>如果 <code>onFulfilled</code> 或者 <code>onRejected</code> 抛出一个异常 <code>e</code> ，则 <code>promise2</code> 必须拒绝执行，并返回拒因 <code>e</code></li><li>如果 <code>onFulfilled</code> 不是函数且 <code>promise1</code> 成功执行， <code>promise2</code> 必须成功执行并返回相同的值</li><li>如果 <code>onRejected</code> 不是函数且 <code>promise1</code> 拒绝执行， <code>promise2</code> 必须拒绝执行并返回相同的据因</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// promise resolve</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> promise1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// onFulfilled是函数且有返回值返回值</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> promise2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> promise1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(promise2); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [[PromiseState]]:  &quot;fulfilled&quot;  [[PromiseResult]] :  3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// onFulfilled不是函数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">promise2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> promise1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">666</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(promise2); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [[PromiseState]]:  &quot;fulfilled&quot;  [[PromiseResult]] :  1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// onFulfilled抛出错误</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">promise2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> promise1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">13123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(promise2); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [[PromiseState]]:  &quot;rejected&quot;  [[PromiseResult]] :  Error: 13123 at &lt;anonymous&gt;:13:40</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// promise reject</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> promise1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">reject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  reject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// onRejected是函数且有返回值返回值</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> promise2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> promise1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(promise2); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [[PromiseState]]:  &quot;fulfilled&quot;  [[PromiseResult]] :  3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// onRejected不是函数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">promise2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> promise1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">666</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">666</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(promise2); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [[PromiseState]]:  &quot;rejected&quot;  [[PromiseResult]] :  1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// nRejected抛出错误</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">promise2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> promise1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">13123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(promise2); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [[PromiseState]]:  &quot;rejected&quot;  [[PromiseResult]] :  Error: 13123 at &lt;anonymous&gt;:13:40</span></span></code></pre></div><p>可以看到有返回值的时候promise2都是fulfilled，没有返回值的时候就和promise状态/result一致，有报错的情况就是rejected</p><h2 id="promise-解决过程" tabindex="-1"><strong>Promise 解决过程</strong> <a class="header-anchor" href="#promise-解决过程" aria-label="Permalink to &quot;**Promise 解决过程**&quot;">​</a></h2><p><strong>Promise 解决过程</strong>是一个抽象的操作，其需输入一个 <code>promise</code> 和一个值，我们表示为 <code>[[Resolve]](promise, x)</code>，如果 <code>x</code> 有 <code>then</code> 方法且看上去像一个 Promise ，解决程序即尝试使 <code>promise</code> 接受 <code>x</code> 的状态；否则其用 <code>x</code> 的值来执行 <code>promise</code> 。</p><p>这种 <em>thenable</em> 的特性使得 Promise 的实现更具有通用性：只要其暴露出一个遵循 Promise/A+ 协议的 <code>then</code> 方法即可；这同时也使遵循 Promise/A+ 规范的实现可以与那些不太规范但可用的实现能良好共存。</p><p>运行 <code>[[Resolve]](promise, x)</code> 需遵循以下步骤：</p><h3 id="x-与-promise-相等" tabindex="-1"><code>x</code> 与 <code>promise</code> 相等 <a class="header-anchor" href="#x-与-promise-相等" aria-label="Permalink to &quot;\`x\` 与 \`promise\` 相等&quot;">​</a></h3><p>如果 <code>promise</code> 和 <code>x</code> 指向同一对象，以 <code>TypeError</code> 为据因拒绝执行 <code>promise</code></p><h3 id="x-为-promise" tabindex="-1"><code>x</code> 为 Promise <a class="header-anchor" href="#x-为-promise" aria-label="Permalink to &quot;\`x\` 为 Promise&quot;">​</a></h3><p>如果 <code>x</code> 为 Promise ，则使 <code>promise</code> 接受 <code>x</code> 的状态 [注4][4]：</p><ul><li>如果 <code>x</code> 处于等待态， <code>promise</code> 需保持为等待态直至 <code>x</code> 被执行或拒绝</li><li>如果 <code>x</code> 处于执行态，用相同的值执行 <code>promise</code></li><li>如果 <code>x</code> 处于拒绝态，用相同的据因拒绝 <code>promise</code></li></ul><h3 id="x-为对象或函数" tabindex="-1"><code>x</code> 为对象或函数 <a class="header-anchor" href="#x-为对象或函数" aria-label="Permalink to &quot;\`x\` 为对象或函数&quot;">​</a></h3><p>如果 <code>x</code> 为对象或者函数：</p><ul><li>把 <code>x.then</code> 赋值给 <code>then</code> [注5][5]</li><li>如果取 <code>x.then</code> 的值时抛出错误 <code>e</code> ，则以 <code>e</code> 为据因拒绝 <code>promise</code></li><li>如果 <code>then</code> 是函数，将 <code>x</code> 作为函数的作用域 <code>this</code> 调用之。传递两个回调函数作为参数，第一个参数叫做 <code>resolvePromise</code> ，第二个参数叫做 <code>rejectPromise</code>: <ul><li>如果 <code>resolvePromise</code> 以值 <code>y</code> 为参数被调用，则运行 <code>[[Resolve]](promise, y)</code></li><li>如果 <code>rejectPromise</code> 以据因 <code>r</code> 为参数被调用，则以据因 <code>r</code> 拒绝 <code>promise</code></li><li>如果 <code>resolvePromise</code> 和 <code>rejectPromise</code> 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用</li><li>如果调用 <code>then</code> 方法抛出了异常 <code>e</code>： <ul><li>如果 <code>resolvePromise</code> 或 <code>rejectPromise</code> 已经被调用，则忽略之</li><li>否则以 <code>e</code> 为据因拒绝 <code>promise</code></li></ul></li><li>如果 <code>then</code> 不是函数，以 <code>x</code> 为参数执行 <code>promise</code></li></ul></li><li>如果 <code>x</code> 不为对象或者函数，以 <code>x</code> 为参数执行 <code>promise</code></li></ul><p>如果一个 promise 被一个循环的 <em>thenable</em> 链中的对象解决，而 <code>[[Resolve]](promise, thenable)</code> 的递归性质又使得其被再次调用，根据上述的算法将会陷入无限递归之中。算法虽不强制要求，但也鼓励施者检测这样的递归是否存在，若检测到存在则以一个可识别的 <code>TypeError</code> 为据因来拒绝 <code>promise</code> [注6][6]。</p><h3 id="promise返回值的不同情况" tabindex="-1">promise返回值的不同情况 <a class="header-anchor" href="#promise返回值的不同情况" aria-label="Permalink to &quot;promise返回值的不同情况&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**  promise返回值的不同情况 */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 返回值是一个thenable对象并且是一个函数。用这个函数的第一个参数返回值为值</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> promise1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">reject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">r</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> r</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">666</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(promise1); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [[PromiseState]]:  &quot;fulfilled&quot;  [[PromiseResult]] :  666</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 返回值是一个thenable对象并且是一个函数。用这个函数的第一个参数返回值为值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">promise1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">reject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 888</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(promise1); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [[PromiseState]]:  &quot;fulfilled&quot;  [[PromiseResult]] :  undefined</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 返回值是一个thenable对象并且不是一个函数，直接用这个对象作为返回值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">promise1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">reject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    then: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">999</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(promise1); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [[PromiseState]]:  &quot;fulfilled&quot;  [[PromiseResult]] :  {&quot;then&quot;: 999} --&gt; object</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 返回值是一个promise</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">promise1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">reject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">rj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> rj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(promise1); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [[PromiseState]]:  &quot;fulfilled&quot;  [[PromiseResult]] : 123</span></span></code></pre></div><blockquote><p>和上面代码的主要区别在于，一个是promise的返回值，一个是看then之后的返回值，比前面多了一次then。</p></blockquote><h1 id="注释" tabindex="-1">注释 <a class="header-anchor" href="#注释" aria-label="Permalink to &quot;注释&quot;">​</a></h1><hr><ul><li><p><strong>注1</strong> 这里的<strong>平台代码</strong>指的是引擎、环境以及 promise 的实施代码。实践中要确保 <code>onFulfilled</code> 和 <code>onRejected</code> 方法异步执行，且应该在 <code>then</code> 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现。由于 promise 的实施代码本身就是平台代码（**译者注：**即都是 JavaScript），故代码自身在处理在处理程序时可能已经包含一个任务调度队列。</p><p>**译者注：**这里提及了 macrotask 和 microtask 两个概念，这表示异步任务的两种分类。在挂起任务时，JS 引擎会将所有任务按照类别分到这两个队列中，首先在 macrotask 的队列（这个队列也被叫做 task queue）中取出第一个任务，执行完毕后取出 microtask 队列中的所有任务顺序执行；之后再取 macrotask 任务，周而复始，直至两个队列的任务都取完。</p><p>两个类别的具体分类如下：</p><ul><li><strong>macro-task:</strong> script（整体代码）, <code>setTimeout</code>, <code>setInterval</code>, <code>setImmediate</code>, I/O, UI rendering</li><li><strong>micro-task:</strong> <code>process.nextTick</code>, <code>Promises</code>（这里指浏览器实现的原生 Promise）, <code>Object.observe</code>, <code>MutationObserver</code></li></ul><p>详见 <a href="http://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context" target="_blank" rel="noreferrer">stackoverflow 解答</a> 或 <a href="http://wengeezhang.com/?p=11" target="_blank" rel="noreferrer">这篇博客</a></p></li><li><p><strong>注2</strong> 也就是说在**严格模式（strict）**中，函数 <code>this</code> 的值为 <code>undefined</code> ；在非严格模式中其为全局对象。</p></li><li><p><strong>注3</strong> 代码实现在满足所有要求的情况下可以允许 <code>promise2 === promise1</code> 。每个实现都要文档说明其是否允许以及在何种条件下允许 <code>promise2 === promise1</code> 。</p></li><li><p><strong>注4</strong> 总体来说，如果 <code>x</code> 符合当前实现，我们才认为它是真正的 <em>promise</em> 。这一规则允许那些特例实现接受符合已知要求的 Promises 状态。</p></li><li><p><strong>注5</strong> 这步我们先是存储了一个指向 <code>x.then</code> 的引用，然后测试并调用该引用，以避免多次访问 <code>x.then</code> 属性。这种预防措施确保了该属性的一致性，因为其值可能在检索调用时被改变。</p></li><li><p><strong>注6</strong> 实现不应该对 <em>thenable</em> 链的深度设限，并假定超出本限制的递归就是无限循环。只有真正的循环递归才应能导致 <code>TypeError</code> 异常；如果一条无限长的链上 <em>thenable</em> 均不相同，那么递归下去永远是正确的行为。</p></li></ul>`,79)]))}const E=i(n,[["render",h]]);export{c as __pageData,E as default};
