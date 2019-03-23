<template>
  <div class="z-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'zContent'
}
</script>

<style lang="scss">
  .z-content {
    flex-grow: 1;
  }
</style>
