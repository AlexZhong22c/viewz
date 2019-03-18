<template>
  <div class="z-collapse">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'zCollapse',
    props: {
      single: {
        type: Boolean,
        default: false
      },
      // 不支持Number，难受：
      selected: {
        type: String
      }
    },
    data () {
      return {
        eventBus: new Vue()
      }
    },
    provide () {
      // TODO:之后再想办法在需要的时候才provide inject eventBus:
      return {
        eventBus: this.eventBus
      }
    },
    mounted () {
      this.eventBus.$emit('update:selected', this.selected)
      this.eventBus.$on('update:selected',
      name => {
        this.$emit('update:selected', name)
      })
    }
  }
</script>

<style scoped lang="scss">
  .z-collapse {
    $grey: #ddd;
    $border-radius: 4px;
    border: 1px solid $grey;
    border-radius: $border-radius;
  }
</style>
