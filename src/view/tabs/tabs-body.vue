<template>
  <div class="z-tabs-body">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZTabsBody',
  inject: ['eventBus']
}
</script>

<style lang="scss">
.z-tabs-body {
}
</style>
