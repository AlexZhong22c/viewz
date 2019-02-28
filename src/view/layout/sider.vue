<template>
  <div class="z-sider" v-if="visible">
  <slot></slot>
  <button @click="visible=false">收起</button>
</div>
</template>

<script>
  export default {
    name: 'zSider',
    data() {
      return {
        visible: true
      }
    }
  }
</script>

<style lang="scss">
  .z-sider {
    position: relative;
    > button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
</style>