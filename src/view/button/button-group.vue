<template>
  <div class="z-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZButtonGroup',
  mounted () {
    for (const node of this.$el.children) {
      const name = node.nodeName.toLowerCase()
      if (name !== 'button') {
        console.warn(`z-button-group 的子元素应该全是 z-button，但是你写的是 ${name}`)
      }
    }
  }
}
</script>

<style lang="scss">
  @import "var";
  .z-button-group {
    display: inline-flex;
    vertical-align: middle;
    > .z-button {
      border-radius: 0;
      &:first-child {
        border-top-left-radius: $z-border-radius;
        border-bottom-left-radius: $z-border-radius;
      }
      &:last-child {
        border-top-right-radius: $z-border-radius;
        border-bottom-right-radius: $z-border-radius;
      }

      // 解决边框问题：
      // 在hover的时候才让它走到上层：
      &:not(:first-child) {
        margin-left: -1px;
      }
      &:hover {
        position: relative;
        z-index: 1;
      }
    }
  }
</style>
