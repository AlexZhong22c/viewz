---
title: 借用页面：隐藏路由
---

# “借用页面”

## axios拦截器中间件化

[umi_cms-frontend 代码逻辑演示](https://gitee.com/az22c/umi_cms-frontend#代码逻辑演示)

[axios拦截器中间件化](https://gitee.com/az22c/umi_cms-frontend/tree/master#axios拦截器中间件化)

## checklist

- 【1】其实就是选对了用 模板字符串和它的$插值，才有大面积模板。insertBlanks也可以存活在$插值里面。  用（能回收isExist）的函数括号框顶替模板内的花括号、函数的方括号。
  - [ref](https://gitee.com/az22c/element-checklist/blob/master/src/views/FormEditor/FormCode/snippetVue.js)
  - 【1-1】切换关注点：函数括号框顶替模板内的花括号、方括号（也是靠的$插值才有的）
- 【2】其实就是把不直观的、处理边际情况的操作 **挪到一行代码的后面**，比如控制片段是否产生和控制缩进等 #降低源码的系统复杂度
  - [对比别人代码](https://github.com/vform666/variant-form/blob/master/src/utils/validators.js)


