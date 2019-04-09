<template>
  <div>
    <z-nav :selected.sync="selected" style="margin:20px;">
      <z-nav-item name="home">
        <!-- <a href="https://www.baidu.com" target="_blank"> -->
          首页
        <!-- </a> -->
      </z-nav-item>
      <z-sub-nav name="about">
        <template slot="title">关于</template>
        <z-nav-item name="culture">企业文化</z-nav-item>
        <z-nav-item name="developers">开发团队</z-nav-item>
        <z-sub-nav name="contacts">
          <template slot="title">联系方式</template>
          <z-nav-item name="wechat">微信</z-nav-item>
          <z-nav-item name="qq">QQ</z-nav-item>
          <z-sub-nav name="phone">
            <template slot="title">手机</template>
            <z-nav-item name="cm">移动</z-nav-item>
            <z-nav-item name="cu">联通</z-nav-item>
            <z-nav-item name="cn">电信</z-nav-item>
          </z-sub-nav>
        </z-sub-nav>
      </z-sub-nav>
      <z-nav-item name="hire">招聘</z-nav-item>
    </z-nav>
    <p>这一段文字看看高度有没有变</p>
    <z-nav :selected.sync="selected" vertical style="width: 200px; margin: 20px; margin-top: 200px;">
      <z-nav-item name="home">首页</z-nav-item>
      <z-sub-nav name="about">
        <template slot="title">关于</template>
        <z-nav-item name="culture">企业文化</z-nav-item>
        <z-nav-item name="developers">开发团队</z-nav-item>
        <z-sub-nav name="contacts">
          <template slot="title">联系方式</template>
          <z-nav-item name="wechat">微信</z-nav-item>
          <z-nav-item name="qq">QQ</z-nav-item>
          <z-sub-nav name="phone">
            <template slot="title">手机</template>
            <z-nav-item name="cm">移动</z-nav-item>
            <z-nav-item name="cu">联通</z-nav-item>
            <z-nav-item name="cn">电信</z-nav-item>
          </z-sub-nav>
        </z-sub-nav>
      </z-sub-nav>
      <z-nav-item name="hire">招聘</z-nav-item>
    </z-nav>
  </div>
</template>

<script>
import ZNav from './nav/nav'
import ZNavItem from './nav/nav-item'
import ZSubNav from './nav/sub-nav'

export default {
  name: 'demo',
  components: { ZNav, ZNavItem, ZSubNav },
  data () {
    return {
      selected: ['culture']
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
