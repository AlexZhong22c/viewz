<template>
  <div class="z-toast">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'zToast'
  }
</script>

<style lang="scss">
  .z-toast {
    $font-size: 14px;
    $z-toast-height: 40px;
    $z-toast-bg: rgba(0, 0, 0, 0.75);
    font-size: $font-size;
    height: $z-toast-height;
    line-height: 1.8;
    position: fixed;
    top: 0; left: 50%;
    transform: translateX(-50%);
    display: flex;
    color: white;
    align-items: center;
    background: $z-toast-bg;
    border-radius: 4px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
    padding: 0 16px;
  }
</style>
