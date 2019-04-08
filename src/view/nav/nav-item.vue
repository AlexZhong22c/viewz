<template>
  <div class="z-nav-item"
    :class="{selected}"
    @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZNavItem',
  inject: ['root'],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      selected: false
    }
  },
  created () {
    this.root.addItem(this)
  },
  methods: {
    onClick () {
      // 套路是一开始把数组清空，一路组件方法的递归调用，把parent的name unshift进来数组。这样的算法效率是最快的，不用从上往下遍历谁是它的祖先，不用pid。
      this.root.namePath = []
      this.$parent.updateNamePath && this.$parent.updateNamePath()
      this.$emit('add:selected', this.name)
    }
  }
}
</script>

<style lang="scss">
@import "var";
.z-nav-item {
  padding: 10px 20px;
  position: relative;
  // 下面这段代码和兄弟组件中的重复了：
  &.selected {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;

      border-bottom: 2px solid $z-border-blue1;
      width: 100%;
    }
  }
}
</style>
