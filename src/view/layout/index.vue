<template>
  <div class="z-layout" :class="layoutClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZLayout',
  data () {
    return {
      layoutClass: {
        hasSider: false
      }
    }
  },
  mounted () {
    this.$children.forEach(vm => {
      if (vm.$options.name === 'ZSider') {
        this.layoutClass.hasSider = true
      }
    })
  }
}
</script>

<style lang="scss">
  /* z-layout的高度让开发者自己设置。 */
  .z-layout {
    display: flex;
    flex-direction: column;
    /* 如果和z-sider同级的时候占满剩下的： */
    flex-grow: 1;
    &.hasSider {
      flex-direction: row;
    }
  }
</style>
