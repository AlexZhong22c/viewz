---
title: 口诀
---

# 口诀

- ts Typescript【联断枚泛const】 接口(+5个操作对象的高级类型)   函    （类）   【装】

### vue3和vue2的区别

- **组合式   css编译确实增强了 模板2性能   |   抽事件中心 抽渲染器**   重写ts和虚拟DOM
  - 解释：分别系：js层面  css层面 模板层面 
- 小的语法改动和“略微改进”加起来有十多项吧 【我总结的】

### webpack 

- webpack 5 更新了什么：
  - 一：内部性能优化：瞎猜都知道必有的
  - 二：在**使用**层面，换汤不换药：确实都是一些【1】小修小改：小的改语法不改用法、小改进 【2】内置了一些插件【3】新概念就一两个。
    - 新概念层面：“模块联邦”，暂时先不管
    - （小的改语法不改用法层面，其中就cache特别重要，需要单独看看。 2024年3月10日）
  - !!应对面试：看过自己的笔记有印象，能解释是什么东西即可

### webpack 性能优化

- "主要分为三大方向："  【一下就飞到 分包 那里了】
  - 缓存提高二次构建速度
  - 开发环境优化
  - 生产环境优化 【应是重心】
    - “绝大多数位于此”
- 分包策略优化口诀 【等别人问】： 
  - 体积  |  更共使 频率+   数目

------

- **记忆口诀**   （其实能有效提升的就其中三四个）
  - 缓存提高二次构建速度
    - 替代链：   webpack 5 cache  >  hard-source-webpack-plugin > dll
    - 替代链：   webpack 5 cache > babel缓存  >  cache-loader
  - 【一下就飞到 分包 那里了】
    - 开发环境优化  【暂无内容 见隔壁文件】
    - 预加载/懒加载  【主要是提升不明显】【暂无内容 见隔壁文件】
  - 分包策略： 体积  |  更共使 频率+   数目     【前文已经介绍】
    - 【1】SplitChunks  （配置贼复杂，还要考虑缓存）  和  【2】code split
  - externals：外挂cdn
    - !!! public;src/assets;第三方库都可以
  - 少执行 或者 执行效率
    - 少经过loader：oneOf exclude/include  noParse IgnorePlugin等等 原理都是一样的    【优化打包构建速度】【前文已经介绍】
    - 多线程    【优化打包构建速度】【前文已经介绍】

------

- 上面这几点，自己的经历 同：
  - [【已笔记 】分包策略](https://juejin.cn/post/6844903652956585992)
  - [仅看HardSourceWebpackPlugin，别的垃圾](https://juejin.cn/post/7233046023243907128)



### 性能优化

- 预 懒**缓缓**alive打包
- g需free缩图(预~懒缓~雪格)
- ("塞"忽略)loading懒骨         -----加快首屏显示
- **dom、dom、绘排** 
- **委托、防抖节流、worker、css**还有其他代码逻辑 柯里化 算法优化等等

-----

- 减少DOM显示数（和减少DOM嵌套层级）
  - (一个长度10000的商品列表，怎么显示)(移动设备内存存储数据过多dom也会崩掉)
  - (后端一次性给你返回10万条数据，怎么渲染)
    - [【重要】它参考的文章比较科学，我也是想按这种思路来答](https://juejin.cn/post/7071979844115890206)
  - (所谓的“长列表”通常就是不能分页的列表)
  - (还是)页面懒加载
  - 虚拟列表
    - (其实就保留三屏的列表，自制组件库scoll组件也面临这个性能问题)
    - vue-virtual-scroller和react-virtualized等等
    - [太实现细节edge case；宏观的没说清楚](https://juejin.cn/post/6844903982742110216)
  - 时间分片(requestAnimationFrame+DocumentFragments)：仅适合dom结构简单的，不然还是会爆内存
    - [未笔记 内容超短](https://juejin.cn/post/6844903938894872589)
    - [未笔记 就给方案和代码而已](https://juejin.cn/post/6844904082714984461)
    - 为啥requestCallbackIdle那个就不算时间分片呢/??????


### ant design vue的问题：

- 比如表单里面一个组件上传多个图片。有提供上传多图的，但是实现的时候不是用它的。好像是不支持延迟上传还是不支持限制上传多少张就隐藏按钮的。
  - 如果没做过不知道有这个坑。要自己封装的
  - (用普通div模拟已上传的即可)(里面的逻辑和外面的逻辑不一样的，要做一层转换。)
- 树形图这个，本来就是提供得不足够，很正常，需要二次开发
  - 比如上传多个图片，增删好了之后，再统一上传，然后返回url，统一提交表单。
- 比如固定前几列之后，后面的列和表头对不上------但是具体怎么解决，就笔记下来，脑子没用记
- 组件没渲染，v-decorator还没生效。对form的操作不可用（比如setFieldsValue）。
  - 解决：getFieldDecorator

### 当输入url

- 用户输入www.baidu.com
- (合成url：如果是符合url规则则直接访问；否则“合成url”把输入内容当成搜索内容，拼接为访问搜索引擎的地址)
- (能否利用当前网页的http强缓存)（**后面流程已经和弱缓存的过程是合为一体的**）
- DNS域名解析(即，把域名解析为IP)    (DNS也是要走应用层及其以下的层)
- 和IP地址建立tcp连接，发送HTTP请求   (如果是https会有TLS/SSL 握手)  【详见另外一个文档】
- 服务器接受请求，返回HTTP响应  (或静态资源或静态html等)
- (客户端)接受完响应发起"关闭tcp连接"(4次挥手)  (这要看是否开启了“http keep-alive”。http1.1及http2)
- (浏览器开始了“关键渲染路径”)
  - (遇到js、css、图片引用标签：会再次发送HTTP请求重复上述的步骤。一般都会用cdn，cdn也是基于DNS解析) (cdn也有专题讲它的流程)
    - (包括重绘重排)
    - (在收到CSS文件后会对已经渲染的页面重新渲染)


### 关键渲染路径

- 关键渲染路径
  - parse html  解析cssom  (update render object tree)    update render layer tree   layout (好像是计算布局形象)  paint (计算)  composite(计算合成层信息)  **commit**  分片 rasterize 回到合成线程 commit到cpu

### 如何减少无意义的 重绘重排 (表述清楚一点，应该是：如何减少无意义的 重绘重排)

- 尽可能不要修改影响布局的范围比较大的 DOM
  - 不要使用 `table` 布局，可能很小的一个小改动会造成整个 table 的重新布局(这知识有点老了)
- 常变动的就绝对定位 或者 专门归入合成层
  - 绝对定位：为动画的元素使用绝对定位 `absolute / fixed`（局部重排）
  - 构造合成层：tansform、opacity、filters...这些属性，把经常变动的抽到合成层(不是银弹)
- 如果将要频繁触发重排重绘，则合并dom操作或者样式变动，再统一更新dom
  - 应预先定义好 class，然后修改 DOM 的 `className`(而不是一条一条地修改 DOM 的样式)
    - 使用div.style.cssText(和class同理，不太推荐)
  - 把 DOM 离线后修改，比如：先把 DOM 给 `display:none` (有一次 Reflow)，然后你修改100次样式，然后再把它显示出来
  - 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。(奇技淫巧，看下使用场景合适不合适)
    - [未加笔记](https://juejin.im/post/590f4eadac502e006cf718c3)
  - createDocumentFragment
- 避免触发 强制重排重绘  ----其实就是尽量少读取
  - 不要把 DOM 结点的属性值放在一个循环里当成循环里的变量（因为获取一次，加之循环内修改产生dirty标记，就是强制重排/重绘一次）
  - js保存dom的属性信息，从js内间接地读取dom信息；再确定好修改内容再更新到dom中
- (避免合成层的 隐式合成 的发生)
  - z-index的设置


### 浏览器tab间通信

> 浏览器同源指的是**协议，主机名，端口都相同**
> sessionStorage不能跨标签或者窗口

**【1】只能“同源”的思路：**

- 尝试使用各种本地化存储(列举了该问题场景下比较常用的几种)：
  - localStorage + onstorage事件  
    -  onstorage事件是非当前(且需同源的)页面对localStorage进行修改时才会触发；当前页面修改localStorage不会触发本页面的监听函数
  - IndexedDB也是基于浏览器数据存储，区别是其实现通信需要轮询
- tab间 Worker
  - SharedWorker 共享工作线程（只能同源，兼容性差）
  - Service Worker(加postMessage) (没有详细研究过)
- 【用法最简洁】BroadCastChannel
  -  [参考demo](https://juejin.cn/post/7037001095075348517)
  - (MessageChannel：有BroadCastChannel之后，就很少考虑它。它好像只适用于iframe父子通信) 

**【2】能跨域的思路：(其实就是在跨域的方法里面，能找到很多能应用到浏览器tab之间的！！)**------------按能力强弱排名 

- iframe：仅仅将非同源页面通信转换为同源页面通信。然后再需要配合同源通信手段  【后有例子】
- websocket用服务器做中转
- postMessage 需要结合`window.open`父子tab之间使用，局限性在于要求tab父子等关系。 
- 使用cookie（Cookie中的同源只关注域名，忽略协议和端口，也就是Cookie可以跨二级域名来访问，也可以称为“同站”）
  - 可以加于setInterval回调或者requestIdleCallback回调以轮询
- 【被废弃】document.domain已介绍了不是特别好用

### dns图

https://jdc.jd.com/archives/212917

# 快速已复习

- lazyload的container：更精确指定**被监听滚动**的容器，**若未定义则为最近一个overflow值为auto或scroll的父元素，** 这个规则很实用
  - 懒加载组件：lazyComponent该组件由库方提供，你只需要传入default slot（里面会调用this.$slots.default）就行了，这样可以**随便传组件进去**。
- 宏任务微任务分别有哪些   事件循环00
- 预加载  tcp dns  preload refetch prerender
- 根域 --顶级 -- 权威
- 跨域9+1：jsonp cors  postMessage  domain   cookie  iframe2  nginx ws node
  - broadcastchannel post
  - sharedworker post 
  - ls  indexdb轮询
- 缓存11个 其实有效的只有6个：html indexdb  cook  ls ss caches
  - websql  app cache  userdata push cache flash

# TDOO:

- 做的东西就自己用吗
- (hr轮不是出题目，公开的能录音)
- 午休 / 周六
- 出差
- 跟哪个公司签合同
- 绩效占比
- 固定淘汰比例
- 试用期和转正工资区别
- 电脑自带的吗  /  能电脑自带
- 关系Hub

