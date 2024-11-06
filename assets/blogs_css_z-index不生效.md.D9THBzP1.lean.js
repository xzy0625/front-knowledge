import{_ as s,c as a,ag as n,o as t}from"./chunks/framework.iGf8PnRx.js";const l="/front-knowledge/assets/203af7709e6849d1973db22c7bc3a3d3~tplv-73owjymdk6-jj-mark-v1_0_0_0_0_5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YWt6L655b2i5bel56iL5biI_q75.Dxk6ysfX.awebp",e="/front-knowledge/assets/3973dc2f981c4b028295a2b33ffdf9c7~tplv-73owjymdk6-jj-mark-v1_0_0_0_0_5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YWt6L655b2i5bel56iL5biI_q75.CVrAzzCM.awebp",h="/front-knowledge/assets/1039a1b981834af9a8031212a973c217~tplv-73owjymdk6-jj-mark-v1_0_0_0_0_5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YWt6L655b2i5bel56iL5biI_q75.Fc-xoz7r.awebp",p="/front-knowledge/assets/image-20241106145505427.CSmx5Qny.png",x=JSON.parse('{"title":"z-index问题","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/css/z-index不生效.md","filePath":"blogs/css/z-index不生效.md","lastUpdated":1730877756000}'),k={name:"blogs/css/z-index不生效.md"};function d(E,i,r,o,g,c){return t(),a("div",null,i[0]||(i[0]=[n(`<h1 id="z-index问题" tabindex="-1">z-index问题 <a class="header-anchor" href="#z-index问题" aria-label="Permalink to &quot;z-index问题&quot;">​</a></h1><h2 id="问题引入" tabindex="-1">问题引入 <a class="header-anchor" href="#问题引入" aria-label="Permalink to &quot;问题引入&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;!</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">DOCTYPE</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;en&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> charset</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;UTF-8&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;viewport&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Document&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">head</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  .box1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">400</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">400</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fixed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    z-index</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  .box2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fixed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    z-index</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  .text1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    z-index</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-10000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    background-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">red</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  .text2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    z-index</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    background-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">blue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;box1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;我是box1的文字&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;box2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;我是box2的文字&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>在这么一段代码中无论我们的<code>text2</code>的<code>z-index</code>比<code>text1</code>的大多少都不会展示在上层。</p><p><strong>按照前端z-index原理，数值越大越在上层，不被遮挡，所以这是为什么呢</strong></p><h2 id="查阅文档" tabindex="-1">查阅文档 <a class="header-anchor" href="#查阅文档" aria-label="Permalink to &quot;查阅文档&quot;">​</a></h2><p>在<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index" target="_blank" rel="noreferrer">MDN</a>上可以看到<code>z-index</code>的作用如下：</p><p>对于定位盒子（即 <code>position</code> 属性值非 <code>static</code> 的盒子），<code>z-index</code> 属性会指定：</p><ol><li>盒子在当前<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context" target="_blank" rel="noreferrer">层叠上下文</a>中的层叠等级。</li><li>盒子是否会创建局部层叠上下文。</li></ol><p>也就是说<code>z-index</code>只会在当前的层叠上下文中生效，同时也会收到<code>postion</code>的影响，如果<code>postion</code>设置不正确（<code>static</code>）则也不会生效。</p><h2 id="position" tabindex="-1">position <a class="header-anchor" href="#position" aria-label="Permalink to &quot;position&quot;">​</a></h2><p><code>position</code>属性影响 <code>z-index</code>是否生效，百度内容摘抄如下：</p><blockquote><p>z-index属性用于控制元素在层叠上下文中的显示顺序。当z-index不起作用时，可能是由于以下几个原因：</p><ol><li>没有指定元素的定位属性：z-index属性只对定位元素（position属性值为relative、absolute或fixed）起作用。如果元素没有指定定位属性，z-index将不会生效。因此，需要确保元素的position属性已正确设置。</li><li>元素的定位属性值不正确：如果元素的定位属性值设置不正确，z-index也不会生效。例如，如果元素的position属性值为static（默认值），则z-index属性将不起作用。需要将元素的position属性值设置为relative、absolute或fixed。</li><li>元素的层叠上下文不正确：每个层叠上下文都有自己的层叠水平，z-index只在同一层叠上下文中才有意义。如果元素的z-index属性没有在正确的层叠上下文中设置，它将无法影响其他层叠上下文中的元素。可以通过设置父元素的position属性值为relative、absolute或fixed来创建新的层叠上下文。</li><li>元素的z-index值不正确：如果多个元素都具有定位属性且属于同一层叠上下文，那么z-index值较大的元素将覆盖z-index值较小的元素。因此，需要确保所需元素的z-index值较大。</li></ol><p>总结起来，要使z-index生效，需要确保元素具有正确的定位属性（relative、absolute或fixed），在正确的层叠上下文中，并且具有较大的z-index值。如果仍然无法解决z-index不起作用的问题，可能需要检查其他CSS属性或JavaScript代码是否对元素的显示顺序产生了影响。</p></blockquote><h2 id="层叠上下文-stacking-context" tabindex="-1">层叠上下文(Stacking Context) <a class="header-anchor" href="#层叠上下文-stacking-context" aria-label="Permalink to &quot;层叠上下文(Stacking Context)&quot;">​</a></h2><p>[层叠上下文(Stacking Context)](层叠上下文(Stacking Context)也就是我们的元素如何向<code>z</code>轴排序。假定用户正面向（浏览器）视窗或网页， HTML 元素沿着其相对于用户的一条虚构的 z 轴排开，层叠上下文就是对这些 HTML 元素的一个三维构想。</p><p><img src="`+l+'" alt="image.png"></p><p>每个网页都有一个默认的层叠上下文，这个层叠上下文的根元素就是html元素。html标签中的一切都被置于这个默认的层叠上下文的一个层叠层上（body）。当一个元素创建一个层叠上下文时，它的所有子元素都会受到父元素的层叠顺序影响。这意味着如果一个层叠上下文位于一个最低位置的层，那么其子元素的z-index设置得再大，它都不会出现在其他层叠上下文元素的上面。</p><h3 id="层叠水平与层叠顺序" tabindex="-1">层叠水平与层叠顺序 <a class="header-anchor" href="#层叠水平与层叠顺序" aria-label="Permalink to &quot;层叠水平与层叠顺序&quot;">​</a></h3><p>“层叠水平”，英文称作“stacking level”，在同一层叠上下文中的不同元素重叠时，它们的显示顺序会遵循层叠水平的规则，而z-index能够影响元素的层叠水平。</p><p><strong>重点：在讨论元素基于层叠水平进行排序时，是限制在单个层叠上下文内的。层叠水平不等于z-index属性，所有的元素都存在层叠水平，而z-index属性只能改变定位元素及flex盒子的孩子元素的层叠水平。</strong></p><p>再来说说层叠顺序。“层叠顺序”，英文名为“stacking order”，表示元素发生层叠时候有着特定的垂直显示顺序，这里需要注意，上面的<strong>层叠上下文和层叠水平是概念</strong>，而这里讲到的<strong>层叠顺序则是规则</strong>。</p><p>在一个层叠上下文中按照层叠顺序把元素分为7种层叠水平，默认的层叠顺序如下图所示：</p><p><img src="'+e+'" alt="image.png"></p><p>解释如下：</p><ul><li>（1）背景和边框--形成层叠上下文元素的背景和边框。位于层叠上下文中的最底层。</li><li>（2）负z-index--层叠上下文内z-index值为负的定位元素。</li><li>（3）块级盒子--层叠上下文中非行内非定位元素。</li><li>（4）浮动盒子--非定位浮动元素。</li><li>（5）行内/行内快盒子 -- 层叠上下文中，inline和inline-block非定位元素。</li><li>（6）z-index:0 /auto -- 定位元素。单纯考虑层叠水平，两者表现一样，但实际上对层叠上下文影响不一样。</li><li>（7）正z-index值 -- 定位元素。z-index值越大，越靠近用户。</li></ul><p>在平时开发时，我们经常会使用（2）、（6）、（7），大部分元素的层叠水平都低于z-index为0的定位元素。</p><p><strong>为什么inline/inline-block元素的层叠顺序比浮动元素和块元素都高呢？</strong> 因为：border/background一般为装饰属性，而浮动和块元素一般用作布局，内联元素都是内容。网页中展示最重要的是内容，因此内容的层叠顺序比较高，当发生层叠时，重要的文字和图片等内容优先暴露在屏幕上（如下图）。</p><p><img src="'+h+'" alt="image.png"></p><h2 id="问题解惑" tabindex="-1">问题解惑 <a class="header-anchor" href="#问题解惑" aria-label="Permalink to &quot;问题解惑&quot;">​</a></h2><p>看到z-index上下文以后，我们就明白了。这两个<code>text</code>都不在一个层级内，所以即使<code>z-index</code>为 <code>10000</code> 的<code>text2</code>组件大于<code>z-index</code> 层级为 <code>-10000</code> 的 <code>text1</code> 组件，依然会遮挡。</p><p><img src="'+p+'" alt="image-20241106145505427"></p><p>可以看到。<code>text1</code>所在的父元素高于<code>text2</code>所在的父元素，所以无论怎么设置<code>z-index</code>都不生效。因为<code>z-index</code>只能影响当前层叠上下文的局部层叠上下文顺序。能够生效的办法就是改变父元素的层叠上下文顺序。例如给<code>box2</code>设置<code>z-index=10000</code></p><h2 id="_5、z-index总结" tabindex="-1">5、z-index总结 <a class="header-anchor" href="#_5、z-index总结" aria-label="Permalink to &quot;5、z-index总结&quot;">​</a></h2><p><code>z-index</code>一定要关注层叠上下文（Stacking Context），即：层叠水平（Stacking Level）与层叠顺序（Stacking Order）都需要关注才能生效。</p><p>具体使用技巧总结如下:</p><ul><li>第一步：首先先看要比较的两个元素是否处于同一个层叠上下文(Stacking Context)中</li><li>1）如果是，谁的层叠等级大，谁在上面</li><li>2）如果两个元素不在同一SC中，先比较他们的父SC</li><li>当两个元素层叠水平相同、层叠顺序相同时，在 DOM 结构中后面的元素层叠等级在前面元素之上</li></ul><p>其他注意事项：</p><ul><li>CSS3时，无position属性，z-index值也可能生效，因为css3很多默认<code>display</code>为<code>flex</code></li><li>浏览器兼容性差异</li><li>避免在transform元素下做fixed定位</li></ul><h2 id="参考文档" tabindex="-1">参考文档： <a class="header-anchor" href="#参考文档" aria-label="Permalink to &quot;参考文档：&quot;">​</a></h2><p><a href="https://juejin.cn/post/7433393393218224139?share_token=dfe052c9-4b3c-475e-8e94-18c3ee399eb0" target="_blank" rel="noreferrer">https://juejin.cn/post/7433393393218224139?share_token=dfe052c9-4b3c-475e-8e94-18c3ee399eb0</a></p><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index</a></p><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context</a></p>',42)]))}const F=s(k,[["render",d]]);export{x as __pageData,F as default};
