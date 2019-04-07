<template>
  <div class="z-sub-nav">
    <div @click="onClick" class="z-sub-nav__title">
      <slot name="title"></slot>
    </div>
    <div class="z-sub-nav__popover" v-show="showPopover">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZSubNav',
  data () {
    return {
      showPopover: false
    }
  },
  methods: {
    onClick () {
      this.showPopover = !this.showPopover
    }
  }
}
</script>

<style lang="scss">
  .z-sub-nav {
    position: relative;
    .z-sub-nav__title {
      padding: 10px 20px;
    }
    .z-sub-nav__popover {
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid black;
      // 宽度不塌掉：
      white-space: nowrap;
    }
    // 第二级及更下级的sub-nav__popover按照常理应该改为出现在右边:
    .z-sub-nav .z-sub-nav__popover {
      top: 0;
      left: 100%;
      margin-left: 8px;
    }
  }
</style>
