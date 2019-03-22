<template>
  <div class="z-cascader">
    <div class="z-cascader__trigger" @click="popoverVisible = !popoverVisible">
    </div>
    <div class="z-cascader__popover-wrapper" v-if="popoverVisible">
      <z-cascader-items
        :items="source"
        class="z-cascader__popover"
        :height="popoverHeight"
      ></z-cascader-items>
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
      },
      popoverHeight: {
        type: String
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
  @import "var";
  // FIXME: 样式随便写的，不科学的写法：
  .z-cascader {
    position: relative;
    .z-cascader__trigger {
      border: 1px solid black;
      height: 32px;
      width: 100px;
    }
    .z-cascader__popover-wrapper {
      position: absolute;
      top: 100%;
      left: 0;

      background: white;

      display: flex;

      @extend %z-box-shadow1;
    }
  }
</style>