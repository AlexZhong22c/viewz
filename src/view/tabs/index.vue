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
        validator(value) {
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
    mounted () {
      this.$children.forEach(vm => {
        if (vm.$options.name === 'zTabsHead') {
          vm.$children.forEach(childVm => {
            if (childVm.name === this.selected
              && childVm.$options.name === 'zTabsItem') {
              this.eventBus.$emit('update:selected', this.selected, childVm)
            }
          })
        }
      })
    }
  }
</script>

<style lang="scss">
  .z-tabs {
  }
</style>