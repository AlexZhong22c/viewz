<template>
  <div class="z-cascader-items" :style="{ height: height }">
    <div class="z-cascader-items__items">
      <div
        class="z-cascader-items__label"
        v-for="(item, index) in items"
        @click="curSelected = item"
        :key="index"
      >{{item.name}}<z-icon v-if="item.children" name="right"></z-icon></div>
    </div>
    <div class="z-cascader-items__children" v-if="childrenItems">
      <z-cascader-items :items="childrenItems" :height="height"></z-cascader-items>
    </div>
  </div>
</template>

<script>
  /**
   * 这个组件不能单独作为自定义组件的根组件：
   */
  import Icon from './icon'
  export default {
    name: "zCascaderItems",
    props: {
      items: {
        type: Array
      },
      height: {
        type: String
      }
    },
    data () {
      return {
        curSelected: null
      }
    },
    computed: {
      childrenItems () {
        if (this.curSelected && this.curSelected.children) {
          return this.curSelected.children
        } else {
          return null
        }
      }
    },
    components: { 'z-icon': Icon }
  }
</script>

<style lang="scss">
  @import "var";
  // FIXME: 样式随便写的，不科学的写法：
  .z-cascader-items {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    // 定高，可被用户传入的height通过设置style的方式覆盖掉：
    height: 100px;
    .z-cascader-items__items {
      height: 100%;

      // 补上第一个item label到顶部的距离不足：
      padding: .3em 0;
    }
    .z-cascader-items__children {
      border-left: 1px solid $z-border-gray--light;
    }
    .z-cascader-items__label {
      padding: .3em 1em;
    }
  }
</style>