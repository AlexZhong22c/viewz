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
      // 这里有bug:子组件必须inject eventBus，而这里是有条件provide它：
      if (this.single) {
        return {
          eventBus: this.eventBus
        }
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
