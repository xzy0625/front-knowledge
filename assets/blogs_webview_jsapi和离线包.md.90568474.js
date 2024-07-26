import{_ as s,o as a,c as n,U as l}from"./chunks/framework.11867af4.js";const p="/front-knowledge/assets/image-20240220162622095.e718e49f.png",e="/front-knowledge/assets/image-20240220162642290.7ff99f6c.png",o="/front-knowledge/assets/image-20240220162715728.3f2c8ccb.png",t="/front-knowledge/assets/image-20240220162735066.46bf7625.png",c="/front-knowledge/assets/image-20240220162755269.9ace83ad.png",i="/front-knowledge/assets/image-20240220162815902.5e28bdc2.png",r="/front-knowledge/assets/image-20240220162833435.052302e9.png",A="/front-knowledge/assets/image-20240220162845402.8d177417.png",C="/front-knowledge/assets/image-20240220162857496.5e58f278.png",y="/front-knowledge/assets/image-20240220162914863.4b7ba1cd.png",D="/front-knowledge/assets/image-20240220162925783.3dacceb8.png",d="/front-knowledge/assets/image-20240220162944384.8e8dbfe7.png",h="/front-knowledge/assets/image-20240220163009074.0aff0cfa.png",g="/front-knowledge/assets/image-20240220163034480.78872fc4.png",b="/front-knowledge/assets/image-20240220163049119.f0294599.png",v="/front-knowledge/assets/image-20240220163102825.cb43a698.png",J=JSON.parse('{"title":"一、前言","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/webview/jsapi和离线包.md","filePath":"blogs/webview/jsapi和离线包.md","lastUpdated":1721965609000}'),m={name:"blogs/webview/jsapi和离线包.md"},u=l('<p>参考：<a href="https://km.woa.com/articles/show/597259?kmref=vkm_subscribe" target="_blank" rel="noreferrer">https://km.woa.com/articles/show/597259?kmref=vkm_subscribe</a></p><p><a href="https://juejin.cn/post/6916316666208976904#heading-12" target="_blank" rel="noreferrer">https://juejin.cn/post/6916316666208976904#heading-12</a></p><p>碎碎念：注入的方法其实就是在webview创建的context对象也就是全局对象window上注入native提供的一些函数，通过这些函数就可以调用内部的native。native调用js其实就是执行一段js代码就好了，这个代码一般是执行挂载在window上的一个函数等等。</p><p>| 导语本篇文章探讨“基于 Webview，如何在 App 内实现带离线包能力的 H5”。在当下这个主题似乎有些过时，但 H5 技术以其良好的跨端一致性，长期来看会占据一席之地，希望整理一个较完整的方案，从基本的实现原理到业务具体应用，让不了解的同学对“离线H5&quot;有一个较完整的视角。</p><h1 id="一、前言" tabindex="-1">一、前言 <a class="header-anchor" href="#一、前言" aria-label="Permalink to &quot;一、前言&quot;">​</a></h1><p><img src="'+p+'" alt="image-20240220162622095"></p><p>2009年，PhoneGap 以 “桥接 Web 与 iPhone SDK 之间缝隙“的理念横空出世，让人惊叹于 JS 居然可以调用客户端原生能力。</p><p>随着移动互联网的快速发展，跨端需求迫在眉睫。前期 Hybrid 开发理念的萌芽，基于 Webview 的 Hybrid 开发模式开始盛行，WebViewJavascriptBridge 等 JSBridge 框架也开始流行，同时各大 App 也开始自研 Hybrid 框架。</p><p>Webveiw 因为性能问题一直被社区诟病，2015年 FB 推出 RN 类原生框架，在社区激起波澜。原生渲染、离线、可以和客户端控件混合等特性非常惊艳。相比较 Webview 开发效率有所降低，但在一些较高性能要求的场景有了用武之地。</p><p>当所有人都认为 Webview 是低性能代表时，2017年微信推出小程序，底层基于 Webview，社区再次激起千层浪，Webview 不慢了，体验非常好啊！</p><p>似乎 Hybrid 框架走到了尽头，Webview 有很好的跨端一致性，经过优化也有较好的性能，类原生框架有接近原生的性能，能够满足大部分业务场景。</p><p>2017 年 Google 推出了 Flutter，Flutter 的推出并没有引起大的反响，对于 Google 的技术产品，国内社区也持谨慎态度。但随着 Flutter 的发展，类 Flutter 框架同时面向前端和终端跨端，其性能与终端几乎无差异，填补了类原生框架的不足。Flutter 也成为了当下最火热的 Hybrid 技术。</p><p>Hybrid 框架的发展史也是移动互联网的盛衰史，移动互联网沦为了“古典互联网”，Hybrid 框架这次似乎真的发展到了尽头。</p><p>但无论如何，“生活”总要继续。本篇文章探讨“基于 Webview，如何在 App 内实现带离线包能力的 H5”。在当下这个主题似乎有些过时，但 H5 技术以其良好的跨端一致性，长期来看会占据一席之地，希望整理一个较完整的方案，从基本的实现原理到业务具体应用，让不了解的同学对“离线H5&quot;有一个较完整的视角。以下 Hybrid 均指基于 Webview 的混合式方案。</p><p>一个 Hybrid 框架有一些重要的组成部分，我们先以一张图来描述其整体架构，然后再详尽介绍核心模块应该如何去设计。</p><p><img src="'+e+`" alt="image-20240220162642290"></p><p>从架构图来看，Hybrid 主要由以下模块组成：</p><ol><li>JSBridge：它是前端和客户端通信的基础，是整套框架的核心之一</li><li>Webview 容器：作为 H5 容器，需要提供一些基础的能力</li><li>离线资源管理：客户端对本地离线资源的拉取/更新、拦截等策略</li><li>开发调试：开发调试是业务开发的重要组成部分</li><li>离线包管理后台：离线包版本管理系统</li><li>后台服务：根据客户端版本，返回对应版本的离线包</li><li>离线包协议：前端和客户端约定的离线包协议，前端需要构建出约定的离线包格式</li><li>框架稳定性与安全：白屏检测，异常处理，异常上报等</li></ol><p>其中，JSBridge 作为前端和客户端通信的基础，是整个框架运作的核心，JSBridge 的设计至关重要，所以我们先分析如何选择通信方案</p><h1 id="二、通信方案" tabindex="-1">二、通信方案 <a class="header-anchor" href="#二、通信方案" aria-label="Permalink to &quot;二、通信方案&quot;">​</a></h1><p>所谓通信，即 JS 可以调用 Native 的能力，Native 也可以直接执行一段 JS 代码，达到 Native 通知 JS 的目的。那么通信方式有哪些，应该如何选择？</p><p>备注：目前大部分知名 App 均选择 WKWebview 作为内核，所以以下方案的选择也不再考虑 UIWebview，其原因可参考网上的一些文章，这里不做说明</p><h2 id="_2-1-js-native" tabindex="-1">2.1 JS -&gt; Native <a class="header-anchor" href="#_2-1-js-native" aria-label="Permalink to &quot;2.1 JS -&gt; Native&quot;">​</a></h2><p>在 App 内，JS 做不到的能力就需要借助 Native 去实现，比如分享，获取系统信息，关闭 Webveiw等。JS 调用 Native 主要有以下几种方案：</p><table><thead><tr><th>通信方案</th><th>支持平台</th><th>丢消息</th><th>支持同步返回</th><th>传入对象</th><th>注入原生对象</th><th>数据长度限制</th></tr></thead><tbody><tr><td>假跳转</td><td>全版本全平台</td><td>丢失</td><td>不支持</td><td>不支持</td><td>不支持</td><td>有限制</td></tr><tr><td>弹窗拦截</td><td>UIWebview不支持</td><td>不丢失</td><td>支持</td><td>不支持</td><td>不支持</td><td>无限制</td></tr><tr><td>JSContext 注入</td><td>仅UIWebview支持</td><td>不丢失</td><td>支持</td><td>支持</td><td>支持</td><td>支持</td></tr><tr><td>安卓Interface注入</td><td>安卓全版本</td><td>不丢失</td><td>支持</td><td>支持</td><td>支持</td><td>无限制</td></tr><tr><td>MessageHandler注入</td><td>仅WKWebview支持</td><td>不丢失</td><td>不支持</td><td>不支持</td><td>不支持</td><td>无限制</td></tr></tbody></table><h3 id="方式一-假跳转-同时发送多个请求丢消息、url有长度限制-当下最不应该选择的方案。" tabindex="-1">方式一：假跳转 - 同时发送多个请求丢消息、URL有长度限制，当下最不应该选择的方案。 <a class="header-anchor" href="#方式一-假跳转-同时发送多个请求丢消息、url有长度限制-当下最不应该选择的方案。" aria-label="Permalink to &quot;方式一：假跳转 - 同时发送多个请求丢消息、URL有长度限制，当下最不应该选择的方案。&quot;">​</a></h3><p>所谓“假跳转”，本质是约定一种协议，客户端无差别拦截所有请求，正常 URL 放行，符合约定协议的请求拦截，并做出对应的操作。并且拦截下来的 URL 不会导致 Webview 跳转错误地址，因此是无感知的。</p><p>比如：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 正常网页跳转地址</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> url </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://qq.com/xxx?param=xxx</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 约定跳转 url</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fakeUrl </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">qqstock://getUserInfo/action?param=xx&amp;callbackid=xx</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><p>一个 URL 由协议/域名/路径/参数等组成，我们可以参考这个组成规则，约定一个假的 URL：</p><ol><li>协议用于通信标识：客户端只拦击该类型的协议</li><li>路径用于标识客户端模块及方法</li><li>参数用于数据传递</li></ol><p>当然，不限于这个规则，任何一种合理的约定都可以让 JS 和 Native 正常通信。</p><p>网页中有多种方式可以发起一次请求：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 1. A 标签发起一次</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">qqstock://getUserInfo/action?param=xx&amp;callbackid=xx</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">用户信息</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2. 在JS中创建一个iframe，然后动态插入到 DOM 中</span></span>
<span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">body</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">append</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&lt;iframe src=&quot;qqstock://getUserInfo/action?param=xx&amp;callbackid=xx&quot;&gt;&lt;/iframe&gt;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 3. location.href 跳转</span></span>
<span class="line"><span style="color:#A6ACCD;">location</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">href </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">qqstock://getUserInfo/action?param=xx&amp;callbackid=xx</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><p>JS 发起请求后，客户端如何拦截呢？</p><p>安卓：shouldOverrideUrlLoading：</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Override</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">boolean</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">shouldOverrideUrlLoading</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">WebView</span><span style="color:#A6ACCD;"> view</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">String</span><span style="color:#A6ACCD;"> url</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 1 根据url，判断是否是所需要的拦截的调用 判断协议/域名</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">是</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 2 取出路径，确认要发起的native调用的指令是什么</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 3 取出参数，拿到JS传过来的数据</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 4 根据指令调用对应的native方法，传递数据</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> super</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">shouldOverrideUrlLoading</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">view</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> url</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>iOS的 WKWebView： webView:decidePolicyForNavigationAction:decisionHandler：</p><div class="language-objectivec"><button title="Copy Code" class="copy"></button><span class="lang">objectivec</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //1 根据url，判断是否是所需要的拦截的调用 判断协议/域名</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (是){</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 2 取出路径，确认要发起的native调用的指令是什么</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 3 取出参数，拿到JS传过来的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 4 根据指令调用对应的native方法，传递数据</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 确认拦截，拒绝WebView继续发起请求</span></span>
<span class="line"><span style="color:#A6ACCD;">        decisionHandler(WKNavigationActionPolicyCancel);</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">        decisionHandler(WKNavigationActionPolicyAllow);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    return YES;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>前面也提到了，这是当下最不该采用的方式，主要是它有如下两个致命问题：</p><ol><li><p>同时发起多次跳转，Webview 会直接丢弃掉第二次跳转，所以第二条消息会直接被丢弃</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">location</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">href </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">qqstock://getUserInfo/action?param=111&amp;callbackid=xx</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">location</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">href </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">qqstock://getUserInfo/action?param=222&amp;callbackid=xx</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div></li><li><p>URL 超长：如果 URL 超出系统最长限制了，消息会被截断，这种情况是不可接受的</p></li></ol><p>基于这两个原因，当下不应该再选择这种通信方式。</p><h3 id="方式二-弹窗拦截-alert-confirm-prompt-无明显短板-需要序列化参数-支持同步返回数据。" tabindex="-1">方式二：弹窗拦截（alert/confirm/prompt）- 无明显短板，需要序列化参数，支持同步返回数据。 <a class="header-anchor" href="#方式二-弹窗拦截-alert-confirm-prompt-无明显短板-需要序列化参数-支持同步返回数据。" aria-label="Permalink to &quot;方式二：弹窗拦截（alert/confirm/prompt）- 无明显短板，需要序列化参数，支持同步返回数据。&quot;">​</a></h3><p>客户端可以拦截 JS 这三个方法的调用，JS 侧需要选择一个业务不常用的一个方法，避免和业务发生冲突。</p><p>JS 侧发起如下的调用：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">module</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">base</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">action</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">getUserInfo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">params</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">callbackId</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> jsonData </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#A6ACCD;">([data])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 发起调用，可以同步获取调用结果</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> ret </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">prompt</span><span style="color:#A6ACCD;">(jsonData)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>安卓：onJsPrompt 拦截：</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Override</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">boolean</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onJsPrompt</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">WebView</span><span style="color:#A6ACCD;"> view</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">String</span><span style="color:#A6ACCD;"> url</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">String</span><span style="color:#A6ACCD;"> message</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">String</span><span style="color:#A6ACCD;"> defaultValue</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">JsPromptResult</span><span style="color:#A6ACCD;"> result</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//1 根据传来的字符串反解出数据，判断是否是所需要的拦截而非常规H5弹框</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">是</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 2 取出指令参数，确认要发起的native调用的指令是什么</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 3 取出数据参数，拿到JS传过来的数据</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 4 根据指令调用对应的native方法，传递数据</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> super</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onJsPrompt</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">view</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> url</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> message</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> defaultValue</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> result</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>iOS WKWebView：webView:runJavaScriptTextInputPanelWithPrompt:balbala 拦截：</p><div class="language-objectivec"><button title="Copy Code" class="copy"></button><span class="lang">objectivec</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">- (void)webView:(WKWebView *)webView runJavaScriptTextInputPanelWithPrompt:(NSString *)prompt defaultText:(nullable NSString *)defaultText initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(NSString * _Nullable result))completionHandler{</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 1 根据传来的字符串反解出数据，判断是否是所需要的拦截而非常规H5弹框</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (是){</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 2 取出指令参数，确认要发起的native调用的指令是什么</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 3 取出数据参数，拿到JS传过来的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 4 根据指令调用对应的native方法，传递数据</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 直接返回JS空字符串</span></span>
<span class="line"><span style="color:#A6ACCD;">        completionHandler(@&quot;&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }else{</span></span>
<span class="line"><span style="color:#A6ACCD;">        //直接返回JS空字符串</span></span>
<span class="line"><span style="color:#A6ACCD;">        completionHandler(@&quot;&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>这种通信方式没有明显的短板，而且还支持同步调用获取结果，唯一的缺点是不支持直接传递对象，需要序列化数据，在高频/大数据量通信的场景可能有一些性能上的损耗。</p><h3 id="方式三-jscontext注入-能力强大-遗憾的是只有-uiwebview支持。不推荐使用" tabindex="-1">方式三：JSContext注入 - 能力强大，遗憾的是只有 UIWebview支持。不推荐使用 <a class="header-anchor" href="#方式三-jscontext注入-能力强大-遗憾的是只有-uiwebview支持。不推荐使用" aria-label="Permalink to &quot;方式三：JSContext注入 - 能力强大，遗憾的是只有 UIWebview支持。不推荐使用&quot;">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">//准备要传给native的数据，包括指令，数据，回调等</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">module</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">base</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">action</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">getUserInfo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">params</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">callbackId</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//直接使用这个客户端注入的函数</span></span>
<span class="line"><span style="color:#A6ACCD;">nativeObject</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getUserInfo</span><span style="color:#A6ACCD;">(data)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>由于 WKWebview 不支持，这里不展开讨论了</p><h3 id="方式四-安卓-addjavascriptinterface-目前推荐的方案-具备-jscontext-注入的所有优点-限安卓-4-2-以上版本" tabindex="-1">方式四：安卓 addJavascriptInterface - 目前推荐的方案，具备 JSContext 注入的所有优点（限安卓 4.2 以上版本） <a class="header-anchor" href="#方式四-安卓-addjavascriptinterface-目前推荐的方案-具备-jscontext-注入的所有优点-限安卓-4-2-以上版本" aria-label="Permalink to &quot;方式四：安卓 addJavascriptInterface - 目前推荐的方案，具备 JSContext 注入的所有优点（限安卓 4.2 以上版本）&quot;">​</a></h3><p>安卓可以在 loadUrl 之前 WebView 创建之后，即可配置相关注入功能，注入后 JS 可以直接调用挂载在 nativeObject 上的所有方法</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 通过addJavascriptInterface()将Java对象映射到JS对象</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//参数1：Javascript对象名</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//参数2：Java对象名</span></span>
<span class="line"><span style="color:#A6ACCD;">mWebView</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addJavascriptInterface</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;font-style:italic;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">AndroidtoJs</span><span style="color:#89DDFF;">(),</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">nativeObject</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span></code></pre></div><p>JS 调用：安卓注入的对象挂载在全局，直接调用接口。</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">nativeObject</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getUserInfo</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">js调用了android中的getUserInfo方法</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>这种通信方式的优势在于，没有参数的限制，可直接传对象，无需序列化。同时也支持同步返回结果</p><h3 id="方式五-wkwebview-messagehandler-注入-官方钦点的通信-api-无需-json-化传数据-不丢消息-但不支持同步返回。" tabindex="-1">方式五：WKWebView MessageHandler 注入 - 官方钦点的通信 API，无需 JSON 化传数据，不丢消息，但不支持同步返回。 <a class="header-anchor" href="#方式五-wkwebview-messagehandler-注入-官方钦点的通信-api-无需-json-化传数据-不丢消息-但不支持同步返回。" aria-label="Permalink to &quot;方式五：WKWebView MessageHandler 注入 - 官方钦点的通信 API，无需 JSON 化传数据，不丢消息，但不支持同步返回。&quot;">​</a></h3><p>不同于安卓注入到 JS 全局上下文，iOS 只能给注入对象起一个名字（这里已 nativeObject 为例），同时调用方法只能是 postMessage，所以在 JS 端只能是如下调用：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">//准备要传给native的数据，包括指令，数据，回调等</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">module</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">base</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">action</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">getUserInfo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">params</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">callbackId</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//传递给客户端，不支持同步获取结果</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">webkit</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">messageHandlers</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">nativeObject</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">postMessage</span><span style="color:#A6ACCD;">(data)</span></span></code></pre></div><p>客户端接收处理：</p><div class="language-objectivec"><button title="Copy Code" class="copy"></button><span class="lang">objectivec</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">-(void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message{</span></span>
<span class="line"><span style="color:#A6ACCD;">    //1 解读JS传过来的JSValue  data数据</span></span>
<span class="line"><span style="color:#A6ACCD;">    NSDictionary *msgBody = message.body;</span></span>
<span class="line"><span style="color:#A6ACCD;">    //2 取出指令参数，确认要发起的native调用的指令是什么</span></span>
<span class="line"><span style="color:#A6ACCD;">    //3 取出数据参数，拿到JS传过来的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">    //4 根据指令调用对应的native方法，传递数据</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>从调用方式就可以看出，在 iOS 端不能同步拿到调用接口，天然是异步的。</p><h3 id="最佳方式" tabindex="-1">最佳方式 <a class="header-anchor" href="#最佳方式" aria-label="Permalink to &quot;最佳方式&quot;">​</a></h3><p>通过以上分析，JS -&gt; Native 当下选择如下的通信方式是最合适的： iOS：推荐使用 MessageHandler + prompt 拦截两个方案并存，同时实现异步和同步调用 Android：addJavaScriptInterface 能力强大，使用很方便，当下没有任何缺点</p><h2 id="_2-2-native-js" tabindex="-1">2.2 Native -&gt; JS <a class="header-anchor" href="#_2-2-native-js" aria-label="Permalink to &quot;2.2 Native -&gt; JS&quot;">​</a></h2><p>讲完了 JS -&gt; Native，Native 如何调用 JS 呢？其实就是客户端直接执行 JS 代码，将 JS 代码（字符串）交给 JS 引擎执行。已有方案如下，根据版本选择即可：</p><ol><li><p>iOS: evaluatingJavaScript</p></li><li><p>安卓: 其实 2 个区别不大，使用方法差异也不大：</p><p>4.4 以上 evaluatingJavaScript 4.4 以下 loadUrl</p></li></ol><p>具体是如何调用的呢？假设 JS 上下文存在如下的全局函数</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function calljs(data){</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(JSON.parse(data)) </span></span>
<span class="line"><span style="color:#A6ACCD;">    //1 识别客户端传来的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">    //2 对数据进行分析，从而调用或执行其他逻辑  </span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>客户端想要调用这个函数，需要字符串拼接出 JS 代码，并带上要传递的数据：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//不展开了,data是一个字典，把字典序列化</span></span>
<span class="line"><span style="color:#A6ACCD;">NSString *paramsString = [self _serializeMessageData:data];</span></span>
<span class="line"><span style="color:#A6ACCD;">NSString* javascriptCommand = [NSString stringWithFormat:@&quot;calljs(&#39;%@&#39;);&quot;, paramsString];</span></span>
<span class="line"><span style="color:#A6ACCD;">//要求必须在主线程执行JS</span></span>
<span class="line"><span style="color:#A6ACCD;">if ([[NSThread currentThread] isMainThread]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    [self.webView evaluateJavaScript:javascriptCommand completionHandler:nil];</span></span>
<span class="line"><span style="color:#A6ACCD;">} else {</span></span>
<span class="line"><span style="color:#A6ACCD;">    __strong typeof(self)strongSelf = self;</span></span>
<span class="line"><span style="color:#A6ACCD;">    dispatch_sync(dispatch_get_main_queue(), ^{</span></span>
<span class="line"><span style="color:#A6ACCD;">        [strongSelf.webView evaluateJavaScript:javascriptCommand completionHandler:nil];</span></span>
<span class="line"><span style="color:#A6ACCD;">    });</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>客户端最终拼接出的代码其实只有一行，当然无论多么复杂的 JS 代码都可以用这种方式让 Webview 执行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">calljs(&#39;{data:xxx,data2:xxx}&#39;);</span></span></code></pre></div><p>安卓 4.4 以下没有 evaluatingJavaScript，只有 loadUrl，但其执行方式和 evaluatingJavaScript 没有本质的差异，其调用方式如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">mWebView.loadUrl(&quot;javascript:calljs(\\&#39;{data:xxx,data2:xxx}\\&#39;)&quot;);</span></span></code></pre></div><p>通过直接执行代码的方式，就达到了 Native 数据向 JS 传递的目的。</p><h2 id="_2-3-jsbridge-sdk-设计" tabindex="-1">2.3 JSBridge SDK 设计 <a class="header-anchor" href="#_2-3-jsbridge-sdk-设计" aria-label="Permalink to &quot;2.3 JSBridge SDK 设计&quot;">​</a></h2><p>确定了底层通信 API，我们还需要设计一套 SDK 来处理两端的通信，SDK 要满足以下要求：</p><ol><li><strong>平台无关</strong>：两端的通信机制是有差异的，但对上层业务来说不需要关心这些差异；SDK 是纯 JS 逻辑的封装，和上层使用的业务框架无关（Vue / React 等均支持）</li><li><strong>易用性</strong>：接入简单，通过 npm 安装后即可使用；有一定语义化的封装，比如查询设备信息，可以直接调用 sdk.getSystemInfo，而不用先去建立底层的通信；API 同时支持 Promsie / Callback 两种调用风格等</li><li><strong>可扩展</strong>：SDK 除了要有良好的模块划分，还需要可扩展，为后续功能迭代打下基础</li></ol><p>我们通过三个具体的使用场景来思考如何设计 JSBridge SDK：</p><h3 id="场景一-js-查询设备信息" tabindex="-1">场景一：JS 查询设备信息 <a class="header-anchor" href="#场景一-js-查询设备信息" aria-label="Permalink to &quot;场景一：JS 查询设备信息&quot;">​</a></h3><p>这种场景本质是 JS 调用 Native 的一个函数，Native 收到请求后，把数据回传给 JS。整个过程分为 JS -&gt; Native、Native -&gt; JS 两个阶段，其调用流程如下：</p><p><img src="`+o+`" alt="image-20240220162715728"></p><p>Native -&gt; JS 时，涉及到 Webview 调用 JS 的全局函数，为了避免暴露过多全局变量，设计时我们只暴露全局唯一对象，然后再将相关的方法挂载在这个对象上。核心代码如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const invokeMap = new Map();</span></span>
<span class="line"><span style="color:#A6ACCD;">let invokeId = 0;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class QStockBridge {</span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * 调用Native功能</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param eventName - 事件名称</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param params - 通讯数据</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param callback - 回调函数</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  invoke = (eventName, params, callback) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    invokeId += 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">    invokeMap.set(invokeId, callback);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isAndroid) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      window.QStockBridge.invokeHandler(eventName, params, invokeId);</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      window.webkit.messageHandlers.invokeHandler.postMessage({</span></span>
<span class="line"><span style="color:#A6ACCD;">        event: eventName,</span></span>
<span class="line"><span style="color:#A6ACCD;">        params,</span></span>
<span class="line"><span style="color:#A6ACCD;">        callbackId: invokeId,</span></span>
<span class="line"><span style="color:#A6ACCD;">      });</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  };</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * 调用Native功能</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param eventName - 事件名称</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param params - 通讯数据</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param callback - 回调函数</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  invokeSync(eventName, params, callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    invokeId += 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">    invokeMap.set(invokeId, callback);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isAndroid) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      window.QStockBridge.invokeHandler(eventName, params, invokeId);</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {      // 将消息体直接JSON字符串化，调用 Prompt(),并且可以直接拿到返回值        </span></span>
<span class="line"><span style="color:#A6ACCD;">      const result = prompt(JSON.stringify(params));</span></span>
<span class="line"><span style="color:#A6ACCD;">      return result;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * Native将invoke结果返回给js的回调句柄</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param id - callbackId</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param params - 通讯数据</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  invokeCallbackHandler = (id, params) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const fn = invokeMap.get(id);</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (typeof fn === &#39;function&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      fn(params);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    invokeMap.delete(id);</span></span>
<span class="line"><span style="color:#A6ACCD;">  };</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  getSystemInfo(callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const promsie = new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.invoke(&#39;getSystemInfo&#39;, {}, (res) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (res.status === &#39;success&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          resolve(res);</span></span>
<span class="line"><span style="color:#A6ACCD;">        } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">          reject(res);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">      });</span></span>
<span class="line"><span style="color:#A6ACCD;">    });</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    if (callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return promsie.then(callback).catch(callback);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    return promsie;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">window.QStockBridge = new QStockBridge();</span></span></code></pre></div><p>整个流程分为以下几个调用步骤：</p><ol><li>JS 调用 invoke，生成一个唯一的 callbackId，将 callbackId 和 callback 注册到全局变量 invokeMap 中</li><li>iOS 端，JS 将参数通过 MessageHandler 传递给 Native；安卓通过 Interface 注入的方式，JS 可以直接调用 Native 的方法</li><li>Native 执行业务逻辑，并调用回调函数 QStockBridge.invokeCallbackHandler</li><li>通过调用时生成的唯一的 callbackId， 从 invokeMap 中找到最初发起调用的 JS callback，执行并回传数据</li></ol><p>业务方调用支持 Promise 和 callback 两种调用风格：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">QStockBridge.getSystemInfo()</span></span>
<span class="line"><span style="color:#A6ACCD;">    .then(res =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(res);</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">    .catch(err =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(err);</span></span>
<span class="line"><span style="color:#A6ACCD;">    });</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">QStockBridge.getSystemInfo((res) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(res);</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span></code></pre></div><h3 id="场景二-当-webview-可见-时-js-捕获这个时机来做相应的业务逻辑" tabindex="-1">场景二：当 Webview 可见 时，JS 捕获这个时机来做相应的业务逻辑 <a class="header-anchor" href="#场景二-当-webview-可见-时-js-捕获这个时机来做相应的业务逻辑" aria-label="Permalink to &quot;场景二：当 Webview 可见 时，JS 捕获这个时机来做相应的业务逻辑&quot;">​</a></h3><p>这里只涉及 Native 单向通知到 JS，是标准的发布订阅模式。Native 和 JS 侧约定好事件名，JS 侧提前注册事件，当事件发生时，Native 主动调用 JS。核心实现如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const publishMap = {};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class QStockBridge {</span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * 订阅 Native 事件</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param eventName - 事件名</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param callback - 回调函数</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">   subscribe = (eventName, callback) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (!publishMap[eventName]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      publishMap[eventName] = [];</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    const oldEvents = publishMap[eventName];</span></span>
<span class="line"><span style="color:#A6ACCD;">    publishMap[eventName] = oldEvents.concat(callback);</span></span>
<span class="line"><span style="color:#A6ACCD;">  };</span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * Native将publish结果返回给js的回调句柄</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param eventName - 事件名</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param params - 调用参数</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  subscribeCallbackHandler = (eventName, params) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const cbs = publishMap[eventName] || [];</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (cbs.length) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      cbs.forEach((cb) =&gt; cb(params));</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  };</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * ⻚⾯可⻅通知</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  onPageVisible(callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.subscribe(</span></span>
<span class="line"><span style="color:#A6ACCD;">      &#39;onPageVisible&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      callback,</span></span>
<span class="line"><span style="color:#A6ACCD;">    );</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>业务方订阅示例：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">QStockBridge.onPageInvisible(() =&gt; {});</span></span></code></pre></div><p>不同于 JS 主动调用 Native 函数，订阅不能直接拿到结果，所有没有 Promise 调用风格，只能是 callback 形式。实际在设计 API 时，可以从命名上做一些区分，比如订阅类型的函数都以 onXX 开头。同时，映射表也由单独 publishMap 来维护</p><h3 id="场景三-打开了两个-webview-页面-a-b-b-页面向-a-页面传递一些数据" tabindex="-1">场景三：打开了两个 Webview 页面 A B，B 页面向 A 页面传递一些数据 <a class="header-anchor" href="#场景三-打开了两个-webview-页面-a-b-b-页面向-a-页面传递一些数据" aria-label="Permalink to &quot;场景三：打开了两个 Webview 页面 A B，B 页面向 A 页面传递一些数据&quot;">​</a></h3><p>对于 JS 来说，只能获取到当前 Webview 上下文，单纯通过 JS 是不能感知到其他 Webview 存在的。所以两个 Webveiw 之间要通信，需要借助 Native 做中转，其通信模型如下： （一个 App 内在使用多套框架时，不同框架之间通信也可以基于这个模型）</p><p><img src="`+t+`" alt="image-20240220162735066"></p><p>Webview 之间通信分为三个步骤：</p><p>\\1. Webview A 订阅事件，不同于场景二的订阅模式，订阅结果需要维护在 Native，所以这里需要有一次 JS -&gt; Native 调用</p><p>\\2. Webview B 发起通知，先通知到 Native，这里也有一次 JS -&gt; Native 调用</p><p>\\3. Native 收到通知后，发起一次广播，之前所有注册过的 Webview 都会收到通知，这里有一次 Native -&gt; JS 调用</p><p>那么如何来设计这个通信模型呢？</p><ol><li>JS -&gt; Native 订阅其实就是一次基本的 JS -&gt; Native 函数调用，这里需要约定一个特定的事件名</li><li>JS -&gt; Native 通知同理，也需要约定一个特定的事件名</li><li>Native -&gt; JS 广播，是类似于 invokeCallbackHandler、subscribeCallbackHandler 的回调调用，我们也用一个 notifyMap 来维护这个映射关系</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const notifyMap = new Map();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class QStockBridge {</span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * 混合式框架向Native发送通知 notify</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param eventName - 事件名，命名空间为当前包</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param params - 参数对象，由通知业务自己定义</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param callback - 回调函数，回调是否通知成功</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  notify = (eventName, params, callback) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.invoke(&#39;notify&#39;, { event: eventName, params }, callback);</span></span>
<span class="line"><span style="color:#A6ACCD;">  };</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * webview 事件处理函数，可与notify配合使用</span></span>
<span class="line"><span style="color:#A6ACCD;">   * 事件订阅方法，可对本应用及跨应用事件进行订阅</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param {String} eventName</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param {Function} callback</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  subscribeNotify = (eventName, callback) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.invoke(&#39;subscribeNotification&#39;, { event: eventName }, (res) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (res.status === &#39;success&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        notifyMap.set(eventName, callback);</span></span>
<span class="line"><span style="color:#A6ACCD;">      } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">        callback(res);</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    });</span></span>
<span class="line"><span style="color:#A6ACCD;">  };</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * Native将notify结果返回给js的回调句柄</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param eventName - 事件名</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param params - 调用参数</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  notifyCallbackHandler = (eventName, params) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const fn = notifyMap.get(eventName);</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (&#39;function&#39; === typeof fn) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      fn(params);</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      notifyMap.delete(eventName);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  };</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>业务代码调用示例：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// Webview A 订阅</span></span>
<span class="line"><span style="color:#A6ACCD;">QStockBridge.subscribeNotify(</span></span>
<span class="line"><span style="color:#A6ACCD;">  &#39;QSOverlayPlayerBackClick&#39;, </span></span>
<span class="line"><span style="color:#A6ACCD;">  (res) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(res);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// Webview B 通知</span></span>
<span class="line"><span style="color:#A6ACCD;">QStockBridge.notify(</span></span>
<span class="line"><span style="color:#A6ACCD;">  &#39;QSOverlayPlayerBackClick&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  { test: &#39;a&#39; },</span></span>
<span class="line"><span style="color:#A6ACCD;">  (res) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (res.status === &#39;success&#39;) {      console.log(&#39;通知成功&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">     }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">);</span></span></code></pre></div><p>第三种场景算是较复杂的场景，实际业务中也较常用，需要两个或多个 Webview 来配合使用</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>实际在设计时，还有一些细节上的考量，可根据实际情况做一些规范化要求：</p><ol><li>不同环境的兼容适配（比如浏览器、微信、不同的 App 访问等）</li><li>按模块职责进行划分，比如基础、路由、网络、UI 等</li><li>规范函数命名：Native 回调均命名为xxCallbackHandler、不支持 promise 风格调用的函数均已 onXX 开头</li></ol><p>核心设计思路主要是基于底层通信模型，上层做语义化的封装，按模块职责进行划分，进而达到易用、易管理等目的。</p><h2 id="三、离线包方案" tabindex="-1"><strong>三、离线包方案</strong> <a class="header-anchor" href="#三、离线包方案" aria-label="Permalink to &quot;**三、离线包方案**&quot;">​</a></h2><p>对于 H5 来说，大量时间消耗在网络请求，资源下载阶段，如果 Native 在加载 H5 时，直接从本地读取资源，再配合缓存数据，就可以大大提升 H5 的首屏速度。 对于前端来说，我们希望直接把 HTML/JS/CSS/Image 等资源直接部署到 CDN，任何地方直接通过 <a href="https://domain.com/path/index.html" target="_blank" rel="noreferrer">https://domain.com/path/index.html</a> 访问，在 App 内访问具备离线能力，普通浏览器则是在线访问。</p><p>该如何实现呢？这里的关键在于如何关联访问地址和本地的离线包资源。前端项目构建后，除了将资源部署到 CDN，还需要将构建产物打包成zip包，上传到离线包管理平台，通过唯一 pid 来标识，在 App 内访问时带上 pid=xxx，Webview 优先从本地离线资源目录查找相关资源，找到了直接返回，找不到则在线访问。整体流程如下：</p><p><img src="`+c+`" alt="image-20240220162755269"></p><p>这里面还有非常多的细节：zip 内文件是什么样的格式、管理平台如何管理离线包、App 如何更新/加载离线包。下面我们介绍一种可能的方案</p><h3 id="_3-1-离线包构建" tabindex="-1">3.1 离线包构建 <a class="header-anchor" href="#_3-1-离线包构建" aria-label="Permalink to &quot;3.1 离线包构建&quot;">​</a></h3><p>这里以前端 SPA 项目为例，Vue/React 应用构建产物一般是如下格式：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">build</span></span>
<span class="line"><span style="color:#A6ACCD;">├── index.html</span></span>
<span class="line"><span style="color:#A6ACCD;">└── static</span></span>
<span class="line"><span style="color:#A6ACCD;">    ├── css</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   ├── main.f855e6bc.css</span></span>
<span class="line"><span style="color:#A6ACCD;">    ├── js</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   ├── 787.d4aba7ab.chunk.js</span></span>
<span class="line"><span style="color:#A6ACCD;">    │   ├── main.8381e2a9.js</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── img</span></span>
<span class="line"><span style="color:#A6ACCD;">        └── arrow.80454996.svg</span></span></code></pre></div><p>通常部署时，我们会把 js/css/img 等资源部署到 CDN，通过设置 publicPath，index.html 中引用的地址会是 cdn 地址。</p><p>不同框架构建产物格式会有些许的差别，这种差异对 App 来说是不可接受的，我们需要约定一种统一的离线包格式，只要符合这个约定的 zip 包，都可以是离线包。这个约定我们称之为离线包协议</p><h3 id="_3-1-1-离线包协议" tabindex="-1">3.1.1 离线包协议 <a class="header-anchor" href="#_3-1-1-离线包协议" aria-label="Permalink to &quot;3.1.1 离线包协议&quot;">​</a></h3><p>我们约定，一个离线包包含如下的关键文件：</p><ol><li>page-frame.html，页面的入口文件</li><li>config.json 页面配置文件，包含 Webview 容器的一些配置项，下面会单独介绍</li><li>其他 js/css/img等资源路径不作要求，因为构建时会自动处理好文件引用路径（即使有设置 publicPath，路径中也只是多了publicPath 一层路径）</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">zip</span></span>
<span class="line"><span style="color:#A6ACCD;">└── page-frame.html</span></span>
<span class="line"><span style="color:#A6ACCD;">├── config.json</span></span>
<span class="line"><span style="color:#A6ACCD;">├── css</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── main.f855e6bc.css</span></span>
<span class="line"><span style="color:#A6ACCD;">├── js</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── 787.d4aba7ab.chunk.js</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── main.8381e2a9.js</span></span>
<span class="line"><span style="color:#A6ACCD;">└── img</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── arrow.80454996.svg</span></span></code></pre></div><p>像 Vue-cli、Webpack 等构建工具一般来说都提供了构建 hook，可以在构建完成时，将构建产物修改为符合离线包协议的产物，再进行打包</p><h3 id="_3-1-2-包配置数据" tabindex="-1">3.1.2 包配置数据 <a class="header-anchor" href="#_3-1-2-包配置数据" aria-label="Permalink to &quot;3.1.2 包配置数据&quot;">​</a></h3><p>上面提到，每个离线包有一个 config.json 文件，里面有一些 Webview 容器相关的配置项，那具体有什么配置呢？</p><p>Webview 本身有一些基本的属性，比如主题色，是否透明，是否使用 Native 导航头（为了统一 App 风格，大部分页面使用 Native导航头；有时设计为了追求全屏效果，又需要隐藏 Native 导航头），有时同一个包的不同页面有不同的风格，需要单独配置。所以整个配置分为 global 和 pages 两部分，pages 的配置优先级高于 global</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;global&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;showNavigationBar&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;themes&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;black&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;backgroundColor&quot;: &quot;#0a0c0e&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;white&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;backgroundColor&quot;: &quot;#FFFFFF&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;pages&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;index&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;showNavigationBar&quot;: false</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;detail&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;showNavigationBar&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;themes&quot;: {}    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>实际配置项可根据业务场景进行设计。</p><h3 id="_3-1-3-单工程单包-多包" tabindex="-1">3.1.3 单工程单包/多包 <a class="header-anchor" href="#_3-1-3-单工程单包-多包" aria-label="Permalink to &quot;3.1.3 单工程单包/多包&quot;">​</a></h3><p>现代前端 SPA 应用通常都很复杂，将所有构建产物打包成一个离线包不具备通用性，有时需要将部分产物打进离线包，有时需要将一个项目工程构建出多个离线包。这里提供一种打包思路： 项目增加一个构建配置文件，配置文件描述了每个页面的离线包配置信息，还有很重要的一点，需要控制离线包的大 小，每个页面对应的离线包不能包含其他页面的代码，需要有 “tree shake” 掉非当前页面代码的能力。 实际构建时可以需要根据一定的规则，比如根据页面路由来决定当前页面包含哪些代码。这种方案会侵入到打包流程，可能需要通过 loader 和规则来做一些删除代码的工作，相对来说会复杂一些。但本身来说一个项目工程构建出多个离线包就是一个相对复杂的事，需要根据实际情况来设计打包流程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">[{</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: &#39;https://domain-one.com/path/page-frame.html&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    test: function(options) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      const {</span></span>
<span class="line"><span style="color:#A6ACCD;">        path</span></span>
<span class="line"><span style="color:#A6ACCD;">      } = options;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      return /NewsTZBD/i.test(path);</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    config: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      global: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        showNavigationBar: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">        themes: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          panda: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            backgroundColor: &quot;#f5f6fa&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">          },</span></span>
<span class="line"><span style="color:#A6ACCD;">          black: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            backgroundColor: &quot;#12161f&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">          },</span></span>
<span class="line"><span style="color:#A6ACCD;">          blue: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            backgroundColor: &quot;#f5f6fa&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">      pages: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        index: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          showNavigationBar: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">  }, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: &#39;https://domain-two.com/path/page-frame.html&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    config: {},</span></span>
<span class="line"><span style="color:#A6ACCD;">}]</span></span></code></pre></div><h3 id="_3-2-离线包管理" tabindex="-1">3.2 离线包管理 <a class="header-anchor" href="#_3-2-离线包管理" aria-label="Permalink to &quot;3.2 离线包管理&quot;">​</a></h3><p>讲完了离线包的构建，离线包后续如何管理/更新/使用是关键的一环，下面分三个部分来介绍</p><h3 id="_3-2-1-离线包版本" tabindex="-1">3.2.1 离线包版本 <a class="header-anchor" href="#_3-2-1-离线包版本" aria-label="Permalink to &quot;3.2.1 离线包版本&quot;">​</a></h3><p>离线包每次发布后，都会生成一条记录，有一些基本的属性来标识本条记录：</p><ol><li>pid：和页面访问地址一一对应</li><li>verify_code：pid 和访问地址的加密校验码，访问带 pid 的 url 时，需要做一些安全校验</li><li>pkg_md5：离线包 md5 值，用于校验离线包本身是否被篡改</li><li>gray_rule：灰度规则</li><li>pkg_url：离线包 cdn 地址</li><li>sdk: 依赖的 App 最低版本，和 app 版本有一一对应的关系</li><li>status：发布状态（未发布、灰度发布、全量）</li><li>comment：本次发布描述</li><li>author: 发布人</li></ol><h3 id="_3-2-2-离线包更新" tabindex="-1">3.2.2 离线包更新 <a class="header-anchor" href="#_3-2-2-离线包更新" aria-label="Permalink to &quot;3.2.2 离线包更新&quot;">​</a></h3><p>对于离线包的使用一般有这样的一些诉求：</p><ol><li><strong>最新离线包</strong>：离线包更新尽可能快</li><li><strong>资源离线化</strong>：尽可能使用本地资源</li><li><strong>高命中率</strong>：重要的模块，通过预下载，可以大大提高离线包命中率</li></ol><p>要满足以上诉求，核心是控制离线包的更新时机。</p><p>离线包的下载分为两部分：离线包配置表管理和离线包下载。整体流程如下： <img src="`+i+`" alt="image-20240220162815902"></p><p>App 启动时，会去拉取一个离线包配置表，配置表记录了当前 App 版本对应的所有最新离线包，主要包含以下信息：</p><ol><li>离线包优先级</li><li>离线包 CDN 地址</li><li>离线包校验参数</li></ol><p>为了保证及时拉取到最新的离线包版本，配置表有一些更新时机：</p><ol><li>App 启动时</li><li>N 分钟内 App 激活更新</li></ol><p>离线包的预下载主要依赖配置表，在合适的时机，如 App 首页渲染完成后，提前下载高优先级离线包。</p><p>除了预下载离线包，非高优离线包首次访问时，优先在线访问，同时启动异步加载。当然根据业务需求，提供下载指定离线包的 API，业务侧可以在合适的时机提前下载。</p><h3 id="_3-2-3-访问页面" tabindex="-1">3.2.3 访问页面 <a class="header-anchor" href="#_3-2-3-访问页面" aria-label="Permalink to &quot;3.2.3 访问页面&quot;">​</a></h3><p>在 App 如何打开一个 H5 页面呢，打开页面会经历哪些步骤，和普通浏览器打开 H5 有哪些差别？ 不同于 SPA 应用，App 内页面堆栈需要符合 App 规范，我们仍然可以按 SPA hash 路由的方式来渲染页面，但每个路由对应一个新开的 Webview，在页面回退时其实是关闭了当前 Webview。 新开 Webview 需要调用 Native 能力，标准的 Native 函数调用，可以如下来调用：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class QStockBridge {</span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @params{Object} params 传递数据 { url, p_showNav}</span></span>
<span class="line"><span style="color:#A6ACCD;">   * params.url</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  navigateTo(params) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.invoke(&#39;navigateTo&#39;, params, () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // </span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const url = &#39;https://domain.com/path/index.html?pid=xxx#/index&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">QStockBridge.navigateTo({</span></span>
<span class="line"><span style="color:#A6ACCD;">  p_url: url,</span></span>
<span class="line"><span style="color:#A6ACCD;">  p_showNav: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span></code></pre></div><p>整个 H5 打开流程还需要一些额外的安全校验：</p><ol><li>域名校验，不支持非白名单内的域名</li><li>离线包 md5 校验，防止包被篡改</li><li>verify_code 校验当前访问地址和 pid 是否匹配</li></ol><p><img src="`+r+'" alt="image-20240220162833435"></p><p>安全校验失败时可以采取一定的安全策略：比如合法域名的 H5 直接在线访问，非白名单域名增加安全提醒等。 前面提到，通常 H5 在打包时会设置 publicPath，这些资源是引用的 CDN 地址，我们同样希望这些资源能使用本地资源。 在 iOS 中可以使用 WKURLSchemeHandler 进行拦截，Native 拦截到地址后，需要解析出文件名（前端 js 、css 等资源通常带了 md5 值，可以唯一标识），然后根据文件名去本地查找，如果找到了可直接返回。需要注意的是，这个 API 需要 iOS 11+ 以上才支持。</p><h3 id="_3-3-版本控制" tabindex="-1">3.3 版本控制 <a class="header-anchor" href="#_3-3-版本控制" aria-label="Permalink to &quot;3.3 版本控制&quot;">​</a></h3><p>每个离线包都需要知道最小支持 App 版本，JS 调用的 JSBridge 方法，需要对应版本的 App 去实现，所以版本控制非常重要。版本控制分为两部分：</p><ol><li>离线包构建时需要明确支持的最高 App 版本，版本信息可以放到项目工程配置文件里</li><li>App 在拉取配置文件/拉取单个离线包时，后台根据当前 App 版本及灰度规则返回正确的离线包</li></ol><p>在设计时，离线包版本通过一个虚拟的版本号（这里表示为 SDK@ver）来对应 App 版本，这样好处是 SDK 可以映射不同端 App 版本（iOS、Android、鸿蒙 App 版本号不一致），App 版本和 SDK 版本号解耦。</p><p><img src="'+A+'" alt="image-20240220162845402"></p><p>以如下场景为例：</p><p>一个H5页面，分别对应三个 App 版本均部署了离线包，其中对应 App@10.1.0的离线包处于灰度状态。</p><p><img src="'+C+`" alt="image-20240220162857496"></p><p>当我们用 App@10.1.0 去拉取离线包时，应该返回什么版本呢？</p><ol><li>首先 sdk2.3.0 对应的离线包不能返回，因为它们要求最小支持 App 版本是 10.2.0，一旦返回了可能导致有些 API 调用失败，App@10.1.0 上没有对应的实现</li><li>如果命中了灰度，则返回 sdk@2.2.9 下的离线包版本 1</li><li>如果未命中灰度，则返回 sdk@2.2.8 下的离线包版本 1，JSBridge SDK 通常是向下兼容的，低版本离线包调用的 JSBridge API 高版本的 App 都支持</li></ol><p>不同版本的 App 去拉取离线包时，从最高支持的App版本依次往下匹配离线包，直到找到最新的离线包版本。</p><h2 id="四、容器基础能力" tabindex="-1">四、容器基础能力 <a class="header-anchor" href="#四、容器基础能力" aria-label="Permalink to &quot;四、容器基础能力&quot;">​</a></h2><p>为了更高效地进行业务开发，Webview 容器还需要提供一些基础能力：</p><ol><li>Native UI 组件：Toast、Loading</li><li>内嵌 Native 能力：Native Header、分享面板、下拉刷新</li></ol><h3 id="_4-1-native-ui-组件" tabindex="-1">4.1 Native UI 组件 <a class="header-anchor" href="#_4-1-native-ui-组件" aria-label="Permalink to &quot;4.1 Native UI 组件&quot;">​</a></h3><p>通常来说，前端有自己的 UI 组件库，希望做到“一码多端”。但 App 和 H5 有较大的体验差异，部分基础组件，前端和 Native 不容易对齐，如 Toast、Loading，可以通过 JSBridge 直接调用 Native 组件：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class QStockBridge {</span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * 显示toast</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param {String} position 弹出位置，center（中间），top（顶部）</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param {String} text 要提示的⽂字</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  showToast(position, text, callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.invoke(&#39;showToast&#39;, { position, text }, callback);</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * loading view控制 loadingBar</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param {String} action: show/hide, 控制显示/隐藏</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  loadingBar(action, callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.invoke(&#39;loadingBar&#39;, { action }, callback);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_4-2-内嵌-native-能力" tabindex="-1">4.2 内嵌 Native 能力 <a class="header-anchor" href="#_4-2-内嵌-native-能力" aria-label="Permalink to &quot;4.2 内嵌 Native 能力&quot;">​</a></h3><p>一个典型的页面通常由这些部分组成：页头+刷新区域+主内容区+分享面板等。我们以它来剖析如何规划前端和Native的职责。</p><h3 id="_4-2-1-页头" tabindex="-1">4.2.1 页头 <a class="header-anchor" href="#_4-2-1-页头" aria-label="Permalink to &quot;4.2.1 页头&quot;">​</a></h3><p><img src="`+y+'" alt="image-20240220162914863"></p><p>主流容器的页头均使用 Native Header 来实现，比如微信、美团、百度等，这么做可能有以下考虑：</p><ol><li>统一 App 风格，做到一致的交互体验</li><li>JS 异常导致白屏时，防止 App 陷入假死状态，Native Header 可以控制页面后退。</li></ol><p>不使用 Native Header 的好处，其实就是提供最大限度的灵活性，整个页面都可以由 JS 来实现。同时部分业务场景，在设计上有特殊要求，需要做到“全屏“的效果。 对于平台化的 App ，基础组件一旦依赖 Native，响应速度会变得非常慢，需要根据实际情况来做权衡：统一使用 Native Header，或者主要场景使用 Native Header，同时放开配置化能力，业务可以决定是否使用。 使用 Native Header 也可以做到一定程度的配置化，能够满足大部分的业务场景。将整个 Header 分为三个区域：</p><p><img src="'+D+`" alt="image-20240220162925783"></p><ol><li>左边区域比较简单，只有一个返回按钮，关闭当前 Webview</li><li>标题部分，可以设置标题和子标题，注意需要控制和 document.title 的关系</li><li>功能区：可以设置分享、字体控件等入口</li></ol><p>实际实现时，可以根据业务需要，设计灵活的配置参数：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class QStockBridge {</span></span>
<span class="line"><span style="color:#A6ACCD;">  setHeaderConfig(config, callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.invoke(&#39;setHeaderConfig&#39;, { </span></span>
<span class="line"><span style="color:#A6ACCD;">      title: config.title,</span></span>
<span class="line"><span style="color:#A6ACCD;">      subTitle: config.subTitle,</span></span>
<span class="line"><span style="color:#A6ACCD;">      right: [{</span></span>
<span class="line"><span style="color:#A6ACCD;">        actionName: &#39;font&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      }, {</span></span>
<span class="line"><span style="color:#A6ACCD;">        actionName: &#39;share&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 可传入图标，没有使用系统默认的</span></span>
<span class="line"><span style="color:#A6ACCD;">        icon: &#39;&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      }]</span></span>
<span class="line"><span style="color:#A6ACCD;">     }, callback);</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">  * 监听按钮点击事件</span></span>
<span class="line"><span style="color:#A6ACCD;">  */</span></span>
<span class="line"><span style="color:#A6ACCD;">  onHeaderButtonClick(callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.on(&#39;onHeaderButtonClick&#39;, callback);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_4-2-2-刷新区域" tabindex="-1">4.2.2 刷新区域 <a class="header-anchor" href="#_4-2-2-刷新区域" aria-label="Permalink to &quot;4.2.2 刷新区域&quot;">​</a></h3><p><img src="`+d+`" alt="image-20240220162944384" style="zoom:50%;">上下拉刷新是一个常见的功能，一般包含：刷新动画、提示文案两部分。 这里最核心的问题是，在 App 内我们希望有统一的交互体验，尽管前端有自己的刷新控件，但主刷新控件包含一定复杂度的动画，前端很难和 Native 动画做到统一，所以最好直接 Native 控件。通过约定 API 来达到使用 Native 控件的目的：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class QStockBridge {</span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * 启用下拉刷新（默认关闭），前端仍然可以决定是否使用 Native 刷新控件</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param {Boolean} enabled 下拉刷新开启标识</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param callback</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  enablePullDownRefresh(enabled, callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.invoke(&#39;enablePullDownRefresh&#39;, { enabled }, callback);</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * 下拉刷新，通过 API 调用即可触发，和手动刷新一致</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @function startPullDownRefresh</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  startPullDownRefresh(callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.invoke(&#39;startPullDownRefresh&#39;, {}, callback);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * 下拉刷新完成调用，将收起下拉刷新条</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  stopPullDownRefresh(callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.invoke(&#39;stopPullDownRefresh&#39;, {}, callback);</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  /**</span></span>
<span class="line"><span style="color:#A6ACCD;">   * 下拉刷新触发通知</span></span>
<span class="line"><span style="color:#A6ACCD;">   * @param {Function} callback 回调函数</span></span>
<span class="line"><span style="color:#A6ACCD;">   */</span></span>
<span class="line"><span style="color:#A6ACCD;">  onPullDownRefresh(callback) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.on(&#39;onPullDownRefresh&#39;, callback);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_4-2-3-主内容区" tabindex="-1">4.2.3 主内容区 <a class="header-anchor" href="#_4-2-3-主内容区" aria-label="Permalink to &quot;4.2.3 主内容区&quot;">​</a></h3><p>主内容区其实没有什么争议，完全用 JS 来实现。涉及到 Native 能力的部分，通过 JSBridge 来调用即可。</p><h3 id="_4-2-4-分享面板" tabindex="-1">4.2.4 分享面板 <a class="header-anchor" href="#_4-2-4-分享面板" aria-label="Permalink to &quot;4.2.4 分享面板&quot;">​</a></h3><img src="`+h+'" alt="image-20240220163009074" style="zoom:50%;"><p>分享面板有其特殊性，一般来说呼起分享面板要有全局的遮罩（盖住前端+Native内容），这就必须通过 Native 来实现。一些 Native 页面也有分享功能，两端可以复用逻辑。 不同的业务场景，面板呈现的内容不同。在兼顾动态化和易用性有如下的设计思路：</p><ol><li>常用的功能点，比如分享到微信、QQ，我们考虑封装到Native模块内部，直接通过 API 调用即可，方便业务快速接入使用</li><li>不常用的功能模块（比如复制链接、设置皮肤等），通过传入参数控制，做到灵活配置化</li></ol><h2 id="五、开发调试" tabindex="-1">五、开发调试 <a class="header-anchor" href="#五、开发调试" aria-label="Permalink to &quot;五、开发调试&quot;">​</a></h2><p>一个离线包从开发到正式发布，不同阶段有不同的诉求：</p><ol><li><strong>开发阶段</strong>：开发阶段能够热更新，实时查看改动效果，突出快</li><li><strong>发布前</strong>：测试环境、预发布环境充分验证，需要环境切换能力</li><li><strong>正式发布</strong>：验证最终效果是否符合预期，需要环境切换能力</li></ol><p>下面我们用两部分来讲解如何做的。</p><h3 id="_5-1-本地开发" tabindex="-1">5.1 本地开发 <a class="header-anchor" href="#_5-1-本地开发" aria-label="Permalink to &quot;5.1 本地开发&quot;">​</a></h3><p>混合式开发和 H5 开发并没有太大的区别，唯一区别是调用 JSBridge 时，需要用真机进行调试。 首先在 App 上实现一个调试界面，主要包含以下功能：</p><ol><li>扫码：可以扫任意的 http(s) 协议地址，可以是 CDN 地址，也可以是同网段的 ip 地址</li><li>输入框：支持手动输入 URL</li><li>打开按钮：打开输入框里面的地址</li><li>导航开关：打开的页面是否展示 Native Header</li></ol><p><img src="'+g+'" alt="image-20240220163034480"></p><p>本地开发时，让手机和电脑在同网段，真机扫码访问电脑本机服务地址即可(例如：ip:port/index.html#/index)。前端开发框架一般都具备热更新能力，这种方式和在电脑上开发没有本质区别。 打开页面后，因为在 App 环境内，H5 可直接调用 JSBridge ，非常方便。</p><h3 id="_5-2-在线更新" tabindex="-1">5.2 在线更新 <a class="header-anchor" href="#_5-2-在线更新" aria-label="Permalink to &quot;5.2 在线更新&quot;">​</a></h3><p>所谓在线更新，是指H5打包成离线包，上传到管理平台后，App 通过后台接口拉取离线包，而不是直接访问 H5 地址。 对 App 来说，需要有多套环境：开发、测试、预发布、正式，离线包管理平台需要有对应的环境吗？其实不然，我们最好解耦两者的关系。</p><p><img src="'+b+'" alt="image-20240220163049119"></p><p>离线包管理平台只有两套环境：</p><ol><li>测试环境：对应 App 开发、测试、预发布等非正式环境</li><li>正式环境：对应正式环境</li></ol><p>业务代码中内置各环境对应 API 地址，运行时通过 JSBridge 获取 App 当前的环境配置，这样的好处是，离线包管理平台不用关心 App 有几套环境，两套环境仅仅是为了测试、正式包的隔离</p><h3 id="_5-3-测试环境多版本问题" tabindex="-1">5.3 测试环境多版本问题 <a class="header-anchor" href="#_5-3-测试环境多版本问题" aria-label="Permalink to &quot;5.3 测试环境多版本问题&quot;">​</a></h3><p>默认情况下，App 只会更新当前版本对应最新离线包。同一个 App 版本，当某个离线包涉及多个需求并行开发时，测试冲突怎么办？这里面临的问题是，多人部署多个版本的离线包，相互存在覆盖。 这里提供一种解决方案：在离线包管理后台，每个版本的离线包都有一个二维码，App 扫码后可以下载并使用该版本离线包</p><p><img src="'+v+'" alt="image-20240220163102825"></p><h2 id="六、稳定性与安全" tabindex="-1">六、稳定性与安全 <a class="header-anchor" href="#六、稳定性与安全" aria-label="Permalink to &quot;六、稳定性与安全&quot;">​</a></h2><p>这部分内容不再详细阐述，主要介绍一下应该从哪些方面去考虑框架的稳定性与安全。</p><h3 id="_6-1-资源校验" tabindex="-1">6.1 资源校验 <a class="header-anchor" href="#_6-1-资源校验" aria-label="Permalink to &quot;6.1 资源校验&quot;">​</a></h3><ol><li>资源安全性检测：检查离线包是否有被篡改，可以是包维度的检查，也可以是针对具体的资源文件</li><li>域名白名单：App 内加载的所有 H5 检查域名是否是白名单之内。非白名单内的用户限制调用 JSBridge，并做好相应的安全提示</li></ol><h3 id="_6-2-稳定性方面" tabindex="-1">6.2 稳定性方面 <a class="header-anchor" href="#_6-2-稳定性方面" aria-label="Permalink to &quot;6.2 稳定性方面&quot;">​</a></h3><p>打开一个页面，有一些关键节点：下载离线包、解压缩离线包、加载页面、页面渲染等。 实际在生产中，我们发现每个节点都可能失败。所以在整个流程中，有必要对每个节点做好容错和监控，分析具体原因，进行长期的优化。</p><h3 id="_6-3-安全容器" tabindex="-1">6.3 安全容器 <a class="header-anchor" href="#_6-3-安全容器" aria-label="Permalink to &quot;6.3 安全容器&quot;">​</a></h3><ol><li>在一些特殊的业务场景，比如证券交易，容器需要限制不满足合规要求的操作</li><li>像微信小程序一样，限制使用浏览器 API</li></ol><h2 id="七、番外篇" tabindex="-1">七、番外篇 <a class="header-anchor" href="#七、番外篇" aria-label="Permalink to &quot;七、番外篇&quot;">​</a></h2><p>Q：除了介绍 Hybrid 开发的原理，当下研究 Webview 还有哪些意义？ A：同样基于 Webview，微信小程序基于「管控」和「体验」，设计了双线程模型+离线包的架构，让 Webview 体验焕发新生。还有人说 Webview JS 组件和客户端不能混排，但微信小程序通过同层渲染的方式解决了这个问题。脱离 JSBridge，上层应用还有很多种玩法，了解基本原理才能走得更远。</p><p>Q：技术的价值？ A：近两年一直在思考技术的价值，似乎做了什么，似乎什么也没做。潜意识中，我希望在某个平平无奇的日子里，想到一个点子，做点不一样的东西。就像小程序一样，只是多加了一层webview，竟撑起万亿市值。</p><h2 id="八、总结" tabindex="-1">八、总结 <a class="header-anchor" href="#八、总结" aria-label="Permalink to &quot;八、总结&quot;">​</a></h2><p>让我想起了六年前的一次面试，面试官问 JS 代码在 Native 层到底如何执行，执行结果是如何回传给 JS 的。丞妾做不到啊！现在我终于可以大胆的说，我不仅搞懂了，还知道如何设计一套框架。</p><p>Hybrid 框架的设计和 @necodong 从客户端角度进行了深入的探讨，他是本篇文章背后的架构师。这几年自选股混合式框架的演进（自研Webview框架，Hippy 落地）上我们并肩作战，无论从业务还是技术上都有非常大的进步。</p><p>同时感谢设计师好朋友为我准备了精美的图片 @danielzhu。</p><p>本篇文章的完成，离不开前人经验的总结，甚至有部分代码是直接参考，以下是主要参考链接：</p><ol><li><p><a href="https://blog.cnbang.net/tech/3477/" target="_blank" rel="noreferrer">移动 H5 首屏秒开优化方案探讨</a></p></li><li><p><a href="https://awhisper.github.io/2018/01/02/hybrid-jscomunication/" target="_blank" rel="noreferrer">从零收拾一个hybrid框架（一）-- 从选择JS通信方案开始</a></p></li><li><p><a href="https://mp.weixin.qq.com/s/evzDnTsHrAr2b9jcevwBzA" target="_blank" rel="noreferrer">70%以上业务由H5开发，手机QQ Hybrid 的架构如何优化演进？</a></p></li><li><p><a href="https://mp.weixin.qq.com/s/evzDnTsHrAr2b9jcevwBzA" target="_blank" rel="noreferrer">https://mp.weixin.qq.com/s/evzDnTsHrAr2b9jcevwBzA</a>)</p></li></ol>',234),F=[u];function k(f,S,w,q,N,x){return a(),n("div",null,F)}const P=s(m,[["render",k]]);export{J as __pageData,P as default};
