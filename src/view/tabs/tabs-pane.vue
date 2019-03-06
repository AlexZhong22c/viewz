<template>
  <div class="z-tabs-pane" :class="tabsPaneClass" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'zTabsPane',
    inject: [ 'eventBus' ],
    data () {
      return {
        active: false
      }
    },
    props: {
      name: {
        type: [String, Number],
        required: true
      }
    },
    computed: {
      tabsPaneClass () {
        return {
          active: this.active
        }
      }
    },
    created () {
      // v-if="active"应该可以转移到上一层的：
      this.eventBus.$on('update:selected',
      name => {
        this.active = name === this.name
      })
    }
  }
</script>

<style lang="scss">
  .z-tabs-pane {
    padding: 1em;
  }
</style>