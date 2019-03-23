<template>
  <div class="z-tabs">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'zTabs',
  props: {
    selected: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator (value) {
        return ['horizontal', 'vertical'].includes(value)
      }
    }
  },
  data () {
    return {
      eventBus: new Vue()
    }
  },
  provide () {
    return {
      eventBus: this.eventBus
    }
  },
  methods: {
    checkChildrenValid () {
      if (this.$children.length === 0) {
        throw new Error(
          'tabs的子组件应该是tabs-head和tabs-body，但你没有设置子组件'
        )
      }
    },
    updateEventBusSelected () {
      this.$children.forEach(vm => {
        if (vm.$options.name === 'zTabsHead') {
          vm.$children.forEach(childVm => {
            if (
              childVm.name === this.selected &&
              childVm.$options.name === 'zTabsItem'
            ) {
              this.eventBus.$emit('update:selected', this.selected, childVm)
            }
          })
        }
      })
    }
  },
  mounted () {
    this.checkChildrenValid()
    this.updateEventBusSelected()
  }
}
</script>

<style lang="scss">
.z-tabs {
}
</style>
