<template>
  <div class="z-collapse">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'ZCollapse',
  props: {
    single: {
      type: Boolean,
      default: false
    },
    // 不支持Number??
    selected: {
      type: Array
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

    this.eventBus.$on('update:addSelected',
      name => {
        let selectedCopy = JSON.parse(JSON.stringify(this.selected))
        if (this.single) {
          selectedCopy = [name]
        } else {
          selectedCopy.push(name)
        }
        this.eventBus.$emit('update:selected', selectedCopy)
        this.$emit('update:selected', selectedCopy)
      })

    this.eventBus.$on('update:removeSelected',
      name => {
        let selectedCopy = JSON.parse(JSON.stringify(this.selected))
        const index = selectedCopy.indexOf(name)
        selectedCopy.splice(index, 1)
        this.eventBus.$emit('update:selected', selectedCopy)
        this.$emit('update:selected', selectedCopy)
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
