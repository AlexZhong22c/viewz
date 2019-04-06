<template>
  <div class="z-tabs-item"
    @click="onClickItem"
    :class="tabsItemClass"
    :data-name="name">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZTabsItem',
  // 祖先元素不一定provide，所以eventBus要做非空判断：
  inject: ['eventBus'],
  data () {
    return {
      active: false
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    tabsItemClass () {
      return {
        active: this.active,
        disabled: this.disabled
      }
    }
  },
  created () {
    this.eventBus &&
      this.eventBus.$on('update:selected', name => {
        this.active = name === this.name
      })
  },
  methods: {
    onClickItem () {
      if (this.disabled) {
        return
      }
      this.eventBus && this.eventBus.$emit('update:selected', this.name, this)
      // 编写可测试代码：
      this.$emit('click', this)
    }
  }
}
</script>

<style lang="scss">
.z-tabs-item {
  $blue: blue;
  $disabled-text-color: grey;
  flex-shrink: 0;

  display: flex;
  align-items: center;

  height: 100%;
  padding: 0 1em;

  cursor: pointer;

  &.active {
    color: $blue;
    font-weight: bold;
  }
  &.disabled {
    color: $disabled-text-color;
    cursor: not-allowed;
  }
}
</style>
