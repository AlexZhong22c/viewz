<template>
  <div class="z-row" :class="rowClass" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'zRow',
  props: {
    gutter: {
      type: [ Number, String ]
    },
    align: {
      type: String,
      validator(value) {
        return ['left', 'right', 'center'].includes(value)
      }
    }
  },
  computed: {
    rowClass() {
      const { align } = this
      return [ align && `z-row-align-${align}`]
    },
    rowStyle() {
      const { gutter } = this
      return {
        marginLeft: `-${gutter/2}px`,
        marginRight: `-${gutter/2}px`
      }
    }
  },
  mounted() {
    this.$children.forEach(item => {
      item.gutter = this.gutter
    })
  }
}
</script>

<style lang="scss">
  .z-row {
    display: flex;
    &-align-left {
      justify-content: flex-start;
    }
    &-align-right {
      justify-content: flex-end;
    }
    &-align-center {
      justify-content: center;
    }
  }
</style>