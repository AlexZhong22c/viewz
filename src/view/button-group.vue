<template>
  <div class="z-button-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  .z-button-group {
    display: inline-flex;
    vertical-align: middle;
    > .z-button {
      border-radius: 0;
      &:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      &:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }

      // 解决边框问题：
      // 在hover的时候才让它走到上层：
      margin-right: -1px;
      &:hover {
        position: relative;
        z-index: 1;
      }
    }
  }
</style>