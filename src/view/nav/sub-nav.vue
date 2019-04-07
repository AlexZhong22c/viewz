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
  @import "var";
  .z-sub-nav {
    position: relative;
    .z-sub-nav__title {
      padding: 10px 20px;
    }
    .z-sub-nav__popover {
      background: white;
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 4px;
      // 宽度不塌掉：
      white-space: nowrap;

      box-shadow: 0 0 3px fade_out(black, 0.8);
      border-radius: $z-border-radius;
      font-size: $z-font-size;
      color: $z-color-gray2;

      min-width: 8em;
    }
    // 第二级及更下级的sub-nav__popover按照常理应该改为出现在右边:
    .z-sub-nav .z-sub-nav__popover {
      top: 0;
      left: 100%;
      margin-left: 8px;
    }
    // 又和一级的z-nav-item样式不同：
    .z-nav-item {
      &.selected {
        color: $z-color-gray1;
        background: $z-bg-white--active1;
        // 去掉伪类构造的模拟底线样式：
        &::after {
          display: none;
        }
      }
    }
  }
</style>
