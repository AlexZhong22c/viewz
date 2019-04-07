<template>
  <div>
    <z-nav :selected.sync="selected">
      <z-nav-item name="home">首页</z-nav-item>
      <z-nav-item name="about">关于</z-nav-item>
      <z-nav-item name="hire">招聘</z-nav-item>
    </z-nav>
  </div>
</template>

<script>
import ZNav from './nav/nav'
import ZNavItem from './nav/nav-item'
// import ZSubNav from './nav/sub-nav'

export default {
  name: 'demo',
  components: { ZNav, ZNavItem },
  data () {
    return {
      selected: ['home']
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
