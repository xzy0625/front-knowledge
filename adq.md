# 管理页面

入口文件：`adq/delivery/adp_fe/app/phoenix/src/pages/admanage/index.js`

phoenix下使用了`'admanage-libs': paths.admanagePagePath, // 临时方案，使用多账号的筛选能力`这个模块，从`../../admanage-page/src`这个目录下导入。

adq/delivery/adp_fe/app/phoenix/src/pages/admanage/use-worktable-for-adq.tsx。这个文件下面有`AdmanageTabs`这个东东



AdmanageAdqTabsMemo -> AdmanageTabsUseWorktable -> AdmanageTabs -> AdmanageTabsView（这里面有内容助推的组件`AdmanageContentSecondPromotion`）



adq/delivery/adp_fe/biz/src/adp-components/admanage/buying-type-switch/src/view.tsx -- 顶部售卖类型切换按钮



## 配置相关

1. adq/delivery/adp_fe/app/phoenix/src/pages/admanage/use-worktable-for-adq.tsx 中调用setConfig进行配置的处理
2. adq/delivery/adp_fe/app/admanage-page/src/admanage-setup.tsx  这个管理页面初始化文件非常的重要

### 新版3.0

adq/delivery/adp_fe/app/phoenix/src/pages/admanage/index.js -> 
adq/delivery/adp_fe/app/phoenix/src/pages/admanage/use-worktable-for-adq.tsx -> 
adq/delivery/adp_fe/app/admanage-page/src/admanage-tabs/index.ts(AdmanageTabs) -> 
adq/delivery/adp_fe/app/admanage-page/src/admanage-tabs/src/index.tsx(AdmanageTabsNew) -> adq/delivery/adp_fe/app/admanage-page/src/admanage-tabs/src/view/index.tsx  这里面会有3.0的逻辑



adq/delivery/adp_fe/app/admanage-page/src/pages/admanage-single-adq-3.0/init.tsx  入口文件在这里.....

adq/delivery/adp_fe/app/admanage-page/src/admanage-tabs/src/index.tsx

useAdmanageTabs 这个hooks非常重要

**这个文件里面会调用useAdmanageTabs来切换tabs和进行售卖方式广告类型的切换。useAdmanageTabs会调用`useGlobalBuyingType`**  ---- 这个非常重要啊



### useGlobalBuyingType

adq/delivery/adp_fe/app/admanage-page/src/admanage-tabs/src/hooks/global-buying-type.ts

这个hooks主要用来更新url参数和初始化ad-manage的配置

### BuyType

adq/delivery/adp_fe/biz/src/adp-components/admanage/buying-type-switch/src/hooks.ts

这个hooks主要用来进行`buyingType`和`campaignType`的管理，同时进行ad-manage的配置的切换



# 下单页面

备注：

1. 基本所有的组件都在`order-page/src/containers/order`目录下面

#### 入口文件

`adq/delivery/adp_fe/app/order-page/src/pages/ad/edit/src/index.js`。里面有一个`page`组件

#### 广告组件

1. 在`Adgroup`中通过`modulesComponents`加载不同的广告组件，这个组件里面会引入其他非常多的文件，都是在`adgroup`下面的`action`(adq/delivery/adp_fe/app/order-page/src/actions/creators/ad/adgroup/index.js)里面通过`loadComponents`加载的
   - 广告版位组件在`adq/delivery/adp_fe/app/order-page/src/containers/order/CrtList/index.js`中。`<CrtOrSiteList />`。<CrtOrSiteList />中有组件`<HrBox />分割组件，左边是版位组件`<ListSelectorForNewUI />`，右边是预览组件`<SitePreview />`。其中版位组件中的`<BlockSelector />有一个属性`data`就是传入里面的值
   - 广告定向在 `containers/order/AdTarget`中。
   - 排期与出价在`containers/order/ScheduleAndPrice`中。
2. adq/delivery/adp_fe/app/order-page/src/actions/creators/ad/adgroup  这里面有很多广告相关的东西

#### 创意组件

入口文件：adq/delivery/adp_fe/app/order-page/src/containers/order/Ad.js

最后展示的都是`CreativeFormModel`组件。genCreativeForm() -> `<creativeFormIns.View {...props} />` -> setupCreativeFormInstance() -> CreativeFormModel组件 -> CreativeFormModel的view属性`AdCreativeFormView`

##### 渲染逻辑

`CreativeFormModel`中会有一个`view`属性，这个属性就是我们最后要渲染的组件实例，通过``<creativeFormIns.View {...props} />`的方式渲染到页面上

最后访问的是 `adq/delivery/adp_fe/app/order-page/src/bgm/creative-form/view/creative/index.js`组件

#### 确认页面

1. ads组件中点击提交，触发`onPageSubmitBtnClick`，再触发`showConfirmDialog`
2. `showConfirmDialog`中会触发`showAdgroupDataPreviewDialog = require('modules/adgroupDetailPreview').showAdgroupDataPreviewDialog;`拉取我们的预览文件。然后会调用`showAdgroupDataPreviewDialog`这个函数，这个函数里面会调用`showPop`
3. 最后提交的时候会使用`showAdgroupDataPreviewDialog`传入的`obSubmit`函数进行提交
4. handleSubmitData -> onConfirmSubmit -> cgiFn -> createAdCgi

### 广告接口api定义

adq/delivery/adp_fe/app/order-page/src/models/cgi/adgroup.js

### 整个页面

1. `dispatch(validate(true))`这个用来专门校验用的
