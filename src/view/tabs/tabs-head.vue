<template>
  <div class="z-tabs-head">
    <slot></slot>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'zTabsHead',
    inject: [ 'eventBus' ]
  }
</script>

<style lang="scss">
  .z-tabs-head {
    $tab-height: 40px;

    display: flex;
    height: $tab-height;
    border: 1px solid red;

    // 向右对齐：
    > .actions-wrapper {
      margin-left: auto;
    }
  }
</style>