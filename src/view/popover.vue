<template>
  <div class="z-popover"
    @click="xxxxxx">
    <slot></slot>
    <div class="z-popover__content-wrapper"
      v-if="visible">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zPopover',
  data() {
    return { visible: false }
  },
  methods: {
    xxxxxx() {
      this.visible = !this.visible
    }
  }
}
</script>

<style scoped lang="scss">
// TODO: BEM
.z-popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
  .z-popover__content-wrapper {
    position: absolute;
    bottom: 100%;
    left: 0;
    border: 1px solid red;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }
}
</style>
