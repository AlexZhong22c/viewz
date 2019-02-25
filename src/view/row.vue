<template>
  <div class="z-row" :style="{marginLeft:`-${gutter/2}px`, marginRight:`-${gutter/2}px`}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'zRow',
  props: {
    gutter: {
      type: [Number, String]
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
  }
</style>