<template>
  <div class="z-tabs-head">
    <slot></slot>
    <div class="z-tabs-head__bottom-line" ref="bottom-line"></div>
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
    $blue: blue;

    display: flex;
    height: $tab-height;
    border: 1px solid red;
    position: relative;
    > .z-tabs-head__bottom-line {
      position: absolute;
      bottom: 0;
      border-bottom: 1px solid $blue;
      width: 100px;
    }
    // 向右对齐：
    > .actions-wrapper {
      margin-left: auto;
    }
  }
</style>