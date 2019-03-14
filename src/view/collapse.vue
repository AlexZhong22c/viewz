<template>
  <div class="z-collapse">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'zCollapse'
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
