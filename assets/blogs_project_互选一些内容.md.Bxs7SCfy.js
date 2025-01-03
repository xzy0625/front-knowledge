import{_ as l,c as r,ag as t,o as a}from"./chunks/framework.CP8Mv0l3.js";const c=JSON.parse('{"title":"项目相关","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/project/互选一些内容.md","filePath":"blogs/project/互选一些内容.md","lastUpdated":1735875453000}'),i={name:"blogs/project/互选一些内容.md"};function e(s,o,n,h,p,g){return a(),r("div",null,o[0]||(o[0]=[t('<h1 id="项目相关" tabindex="-1">项目相关 <a class="header-anchor" href="#项目相关" aria-label="Permalink to &quot;项目相关&quot;">​</a></h1><h2 id="表单配置" tabindex="-1">表单配置 <a class="header-anchor" href="#表单配置" aria-label="Permalink to &quot;表单配置&quot;">​</a></h2><p>参考：<a href="https://juejin.cn/post/7119639489567260686?searchId=20241220180113BBFB8419351C6543C08A" target="_blank" rel="noreferrer">https://juejin.cn/post/7119639489567260686?searchId=20241220180113BBFB8419351C6543C08A</a></p><h3 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h3><p>其实这个项目就是一个大的表单，通过表单去收集数据 / 转换 / 校验 / 提交。所以关键是如何管理数据和管理表单。</p><ol><li><p>通过将组件和数据分离的方式，通过hook像UI中注入对应的数据。</p></li><li><p>将组件配置和数据放在一个hook中。使用的时候调用对应的hook获取配置 / 表单数据 / 表单数据更新函数</p><ul><li>结构和UI分离。不用写死组件。灵活性高</li><li>逻辑归拢在一个hook中</li><li>可以方便的组织组件结构。例如某个组件要在不同的场景展示在不同的地方。通过js的方式就可以实现。直接写死的方式需要访问两套UI</li></ul><p>不好的地方：</p><ul><li>不够直观</li></ul></li></ol><h4 id="配置化方式" tabindex="-1">配置化方式 <a class="header-anchor" href="#配置化方式" aria-label="Permalink to &quot;配置化方式&quot;">​</a></h4><p><strong>优点：</strong></p><ol><li><strong>可维护性</strong>：通过配置文件来定义表单，使得表单的结构和行为与UI表示分离，便于管理和维护。</li><li><strong>可复用性</strong>：配置文件可以在不同的表单中重用，提高开发效率。</li><li><strong>动态性</strong>：可以根据不同的需求动态生成表单，例如根据服务器返回的数据结构动态创建表单元素。</li><li><strong>易于测试</strong>：配置化的结构使得单元测试更加方便，可以针对配置逻辑进行测试而无需关心UI实现细节。</li></ol><p><strong>缺点：</strong></p><p>不够直观 / 需要了解配置规则和解析文件。</p><ol><li><strong>学习成本</strong>：需要开发者学习如何编写和解析配置文件。</li><li><strong>复杂性</strong>：对于复杂的表单，配置文件可能变得难以管理和理解。</li><li><strong>性能考虑</strong>：动态解析配置文件并生成UI可能会引入额外的性能开销。</li></ol><h4 id="直接定义ui的方式" tabindex="-1">直接定义UI的方式 <a class="header-anchor" href="#直接定义ui的方式" aria-label="Permalink to &quot;直接定义UI的方式&quot;">​</a></h4><p><strong>优点：</strong></p><ol><li><strong>直观性</strong>：直接在代码中定义UI，开发者可以直接看到UI的结构，易于理解和修改。</li><li><strong>控制性</strong>：开发者可以精确控制表单的每一个细节，对于复杂的UI交互和样式有更好的控制。</li><li><strong>性能优化</strong>：避免了配置解析的过程，可能会有更好的性能表现。</li></ol><p><strong>缺点：</strong></p><ol><li><strong>可复用性差</strong>：直接定义的UI较难在不同的项目或表单间复用。</li><li><strong>可维护性差</strong>：随着项目的扩展，直接定义的表单可能变得难以维护，特别是当表单结构复杂或需要频繁修改时。</li><li><strong>测试困难</strong>：直接与UI绑定的逻辑可能使得测试变得更加困难，尤其是在没有分离逻辑和UI时。</li></ol><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>选择哪种方式取决于项目的具体需求和团队的偏好。如果项目需要快速开发且表单结构变化不大，直接定义UI可能更合适。而对于需要高度动态生成且频繁变更的表单，配置化方式可能更有优势。在实际应用中，也可以根据具体情况结合使用这两种方法，以达到最佳的开发效率和用户体验。</p><h3 id="具体实现" tabindex="-1">具体实现 <a class="header-anchor" href="#具体实现" aria-label="Permalink to &quot;具体实现&quot;">​</a></h3><p>关键在于配置的设计，需要扩展好，后续改动小。</p><ol><li>hook封装表单配置 / 表单数据 / 表单数据更新函数</li><li>表单配置 <ul><li>包含组件名 / props / 校验规则等等</li></ul></li><li>表单数据解析。编写一个Form组件。传入组件配置进行解析，并且调用数据更改函数(传入key，value)等</li><li>error提交的时候收集所有的rules然后进行校验</li></ol>',22)]))}const u=l(i,[["render",e]]);export{c as __pageData,u as default};
