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
