import{_ as s,o as a,c as n,U as l}from"./chunks/framework.11867af4.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/redux/redux原理.md","filePath":"blogs/redux/redux原理.md","lastUpdated":1721965436000}'),o={name:"blogs/redux/redux原理.md"},p=l(`<h2 id="redux" tabindex="-1">redux <a class="header-anchor" href="#redux" aria-label="Permalink to &quot;redux&quot;">​</a></h2><p>首先明白<code>redux</code>并不是服务于某个特定的框架，他只是实现了一套全局的状态管理，我们可以将其适用于任何框架。例如为了和<code>react</code>配套我们就实现了<code>react-redux</code>。</p><h3 id="redux和框架如何联动" tabindex="-1">redux和框架如何联动 <a class="header-anchor" href="#redux和框架如何联动" aria-label="Permalink to &quot;redux和框架如何联动&quot;">​</a></h3><p>在<code>redux</code>中，数据改变只能是由<code>dispatch</code>引起的，但是这个数据的改变没办法引起框架UI的渲染。所以这里需要有一个桥梁，可以实现双向通信。</p><blockquote><p><code>redux</code>数据改变 -&gt;<code> UI</code>渲染</p><p>用户触发<code>UI</code>事件 -&gt; <code>redux</code>数据改变 -&gt; <code> UI</code>渲染</p></blockquote><p>这里面的关键就是我们创建完<code>store</code>之后，通过<code>context</code>和<code>react</code>产生关联。我们可以在<code>store</code>上获取到<code>state</code>，<code>subscribe</code>，<code>dispatch</code>。</p><p>所以，用户触发<code>UI</code>事件就是调用<code>context</code>上的<code>store</code>的<code>dispatch</code>。<code>dispatch</code>又会触发<code>store</code>上绑定的监听事件的调用。所以在我们使用<code>useSelector</code>这种<code>hooks</code>的时候，我们会在<code>store</code>上添加一个<code>listner</code>。这个<code>listner</code>会触发组件的渲染。（react帮我们实现了这样一个<code>hooks</code>: <code>usesyncexternalstore</code>。可以实现<code>UI</code>渲染）。</p><h3 id="createselector如何缓存" tabindex="-1">createSelector如何缓存 <a class="header-anchor" href="#createselector如何缓存" aria-label="Permalink to &quot;createSelector如何缓存&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> selector </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createSelector</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  [</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">state</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RootState</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">todos</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">state</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RootState</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">alerts</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">state</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RootState</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">todos[id]</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">allTodos</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">allAlerts</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">selectedTodo</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">111111</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">计算了一次</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">allTodos</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">allAlerts</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">selectedTodo</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">selector</span><span style="color:#A6ACCD;">(state</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 打印 111111, 计算了一次</span></span>
<span class="line"><span style="color:#82AAFF;">selector</span><span style="color:#A6ACCD;">(state</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 不打印</span></span></code></pre></div><p><code>createSelector</code>内部会有一个<code>weakMap</code>的缓存对象。会按照返回的<code>selector</code>中传递的参数一个个存储下来（这些参数不变，说明我们传入的<code>inputSelector</code>肯定也不会变），例如上面的缓存如下：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">cacheNode </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">o</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">state</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> state</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>所以我们可以通过一层一层去参数来获取值，只要有一个取不到就代表没有缓存，要重新计算。</p><h3 id="subscribe如何解除监听" tabindex="-1">subscribe如何解除监听 <a class="header-anchor" href="#subscribe如何解除监听" aria-label="Permalink to &quot;subscribe如何解除监听&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> currentListeners</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Map</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ListenerCallback</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Map</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 存储监听器</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> nextListeners </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> currentListeners</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> listenerIdCounter </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// id自增，用来代指特定的监听器</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> isDispatching </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">subscribe</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">listener</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">listener</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">function</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 报错</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">isDispatching</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 报错</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">isSubscribed</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">ensureCanMutateNextListeners</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">listenerId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">listenerIdCounter</span><span style="color:#89DDFF;">++</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">nextListeners</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">listenerId</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">listener</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">// Map添加新的监听</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">unsubscribe</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 解除监听函数</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">isSubscribed</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">isDispatching</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 报错</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">isSubscribed</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">ensureCanMutateNextListeners</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">nextListeners</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">delete</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">listenerId</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">// 删除指定的监听器</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">currentListeners</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span></code></pre></div><p>底层通过一个Map和一个全局自增的<code>listenerIdCounter</code>来完成。每次调用<code>subscribe</code>，<code>listenerIdCounter</code>自增1。所以后面我们解除监听的时候我们只需要删除对应的监听器就好了。</p><h3 id="redux性能优化" tabindex="-1">redux性能优化 <a class="header-anchor" href="#redux性能优化" aria-label="Permalink to &quot;redux性能优化&quot;">​</a></h3><p>Redux 是一个优秀的状态管理库，但在某些情况下，它可能导致性能问题。以下是一些建议，可以帮助你对 Redux 进行性能优化。</p><ol><li><p>使用 Reselect 库</p><p>Reselect 是一个用于创建可记忆的、可组合的 selector 函数的库。使用 Reselect 可以避免不必要的重新渲染和计算，从而提高性能。</p></li><li><p>避免在 mapStateToProps 中创建新对象</p><p>在 mapStateToProps 函数中创建新对象可能导致组件重新渲染。尽量避免这样做，而是将对象的创建放在组件外部或使用 Reselect。</p></li><li><p>使用 PureComponent 或 React.memo</p><p>PureComponent 和 React.memo 都可以避免不必要的重新渲染。它们通过对比新旧 props 来决定是否更新组件。在使用这两者之前，请确保组件的 props 是不可变的。</p></li><li><p>优化 Redux 中间件</p><p>中间件可能会影响性能，尤其是在处理大量 action 时。确保你正在使用的中间件是高效的，并考虑移除不必要的中间件。</p></li><li><p>拆分 reducer</p><p>将一个大的 reducer 拆分成多个小的 reducer 可以提高性能。这样做可以减少每个 reducer 的复杂性，并减少不必要的状态更新。</p></li><li><p>使用批处理处理多个 action</p><p>当需要同时处理多个 action 时，可以使用 redux-batched-actions 库将这些 action 批处理。这样可以减少组件的重新渲染次数。</p></li><li><p>避免过度使用 Redux</p><p>并非所有状态都需要存储在 Redux 中。只有需要在多个组件之间共享的状态才应该放在 Redux 中。对于其他状态，可以考虑使用组件内部的 state。</p></li><li><p>避免store深层次嵌套</p><p>store层级不要太深，不然每次更新会导致需要更新的数据太多。（因为redux底层是基于不可变数据处理的）</p></li></ol><h3 id="redux三大原则" tabindex="-1">redux三大原则 <a class="header-anchor" href="#redux三大原则" aria-label="Permalink to &quot;redux三大原则&quot;">​</a></h3><ul><li><strong>单一事实来源</strong>：整个应用程序的状态存储在单个存储中的对象树中。</li><li><strong>状态是只读的</strong>：改变状态的唯一方法是发出一个动作，一个描述发生了什么的对象。</li><li><strong>使用纯函数进行更改</strong>：要指定状态树如何通过操作进行转换，您可以编写纯减速器。</li><li></li></ul><h3 id="redux的优势" tabindex="-1">redux的优势 <a class="header-anchor" href="#redux的优势" aria-label="Permalink to &quot;redux的优势&quot;">​</a></h3><ol><li>强制使用 action 来描述所有变化可以让我们清晰地知道应用中到底发生了什么。如果一些东西改变了，就可以知道为什么变。actions 就像是描述所发生事情的面包屑导航。 最终，我们开发一个函数将 action 和 state 联系起来，这个函数就是 reducer。同样，这也没有使用什么魔法，reducer 只是一个接收 state 和 action作为其参数，并返回给应用新的 state 的函数。 对于大的应用来说，不大可能仅仅只写一个这样的函数，所以我们编写很多小函数来分别管理 state 的一部分：</li></ol>`,22),e=[p];function t(c,r,y,F,D,i){return a(),n("div",null,e)}const d=s(o,[["render",t]]);export{A as __pageData,d as default};
