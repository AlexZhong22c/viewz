<template>
  <div class="z-cascader-items">
    <div class="z-cascader-items__items">
      <div
        class="z-cascader-items__label"
        v-for="(item, index) in items"
        @click="curSelected = item"
        :key="index"
      >{{item.name}}</div>
    </div>
    <div class="z-cascader-items__children" v-if="childrenItems">
      <z-cascader-items :items="childrenItems"></z-cascader-items>
    </div>
  </div>
</template>

<script>
  /**
   * 这个组件不能单独作为自定义组件的根组件：
   */
  export default {
    name: "zCascaderItems",
    props: {
      items: {
        type: Array
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
    }
  }
</script>

<style lang="scss">
  // FIXME: 样式随便写的，不科学的写法：
  .z-cascader-items {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    .z-cascader-items__items {
      border: 1px solid red;
    }
    .z-cascader-items__children {
      margin-top: -1px;
    }
  }
</style>