<template>
  <div class="z-nav-item"
    :class="{selected, vertical}"
    @click="onClick"
    :data-name="name">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZNavItem',
  inject: ['root', 'vertical'],
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
      // $parent可能是nav和sub-nav:
      this.$parent.updateNamePath && this.$parent.updateNamePath()
      // nav通过先前的保存引用拿到里面层级的nav-item的组件实例，而不是传统的根据组件的嵌套结构拿到组件实例：
      // 再有在nav中的vm.$on()
      this.$emit('update:selected', this.name)
    }
  }
}
</script>

<style lang="scss">
@import "var";
.z-nav-item {
  padding: 10px 20px;
  position: relative;

  &:not(.vertical) {
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
  &.vertical {
    &.selected {
      color: $z-color-blue1;
    }
  }

  // FIXME:里面的元素比如a元素,可点击的范围太小：
  // 为了样式统一，只能去帮用户格式化一下：
  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>
