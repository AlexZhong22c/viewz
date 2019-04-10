<template>
  <div class="z-nav" :class="{vertical}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZNav',
  provide () {
    const { vertical } = this
    return {
      root: this,
      // 供inject provide：
      vertical
    }
  },
  props: {
    selected: {
      type: String
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      items: [],
      namePath: []
    }
  },
  mounted () {
    this.refreshChildrenSelectStatus()
    this.listenToChildrenSelect()
  },
  updated () {
    this.refreshChildrenSelectStatus()
  },
  computed: {
  },
  methods: {
    // 这个method直接通过inject provide暴露给子孙元素，这是一个大耦合：
    // 目前的作用是：更深层的z-nav-item也能调用到它：
    addItem (item) {
      this.items.push(item)
    },
    refreshChildrenSelectStatus () {
      this.items.forEach(item => {
        if (this.selected === item.name) {
          item.selected = true
        } else {
          item.selected = false
        }
      })
    },
    listenToChildrenSelect () {
      this.items.forEach(item => {
        item.$on('update:selected', name => {
          this.$emit('update:selected', name)
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import "var";
.z-nav {
  display: flex;
  border-bottom: 1px solid $z-border-gray1;

  color: $z-color-gray1;
  // 去掉常见的文本选择光标：
  cursor: default;
  // 双击不给选中文本：
  user-select: none;
  &.vertical {
    flex-direction: column;
    border: 1px solid $z-border-gray1;
  }
}
</style>
