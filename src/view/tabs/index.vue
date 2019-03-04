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
      // this.$emit('update:selected', '这是 this $emit 出来的数据')
      // this.eventBus.$emit('update:selected', this.selected)
    }
  }
</script>

<style lang="scss">
  .z-tabs {
  }
</style>