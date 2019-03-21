<template>
  <div class="z-cascader">
    <div class="z-cascader__trigger" @click="popoverVisible = !popoverVisible">
    </div>
    <div class="z-cascader__popover" v-if="popoverVisible">
      <z-cascader-items :items="source"></z-cascader-items>
    </div>
  </div>
</template>

<script>
  import CascaderItems from './cascader-items'

  export default {
    name: 'zCascader',
    components: {
      'z-cascader-items': CascaderItems
    },
    props: {
      source: {
        type: Array
      }
    },
    data() {
      return {
        popoverVisible: false
      }
    },
    created() {
    }
  }
</script>

<style lang="scss">
  // BUGFIX:没有用到变量就不要@import:
  // @import "var";
  // FIXME: 样式随便写的，不科学的写法：
  .z-cascader {
    .z-cascader__trigger {
      border: 1px solid red;
      height: 32px;
      width: 100px;
    }
    .z-cascader__popover {
      border: 2px solid green;
      height: 200px;
      display: flex;
      // 样式穿组件了??
      .z-cascader-items__label {
        white-space: nowrap;
      }
    }
  }
</style>