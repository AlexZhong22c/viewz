<template>
   <button class="z-button">按钮</button>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  .z-button {
    font-size: var(--font-size);
    height: var(--button-height);
    /* 写死width不好： */
    padding: 0 1em;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background: var(--button-bg);
    &:hover {
      border-color: var(--border-color-hover);
    }
    &:active {
      background: var(--button-active-bg);
    }
    /* 后面再优化focus样式： */
    &:focus {
      outline: none;
    }
  }
</style>
