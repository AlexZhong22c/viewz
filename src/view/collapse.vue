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
