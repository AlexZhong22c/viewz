<template>
  <div class="z-cascader-items"
    :style="{ height: height }">
    <div class="z-cascader-items__items">
      <div class="z-cascader-items__label"
        v-for="(item, index) in items"
        @click="onClickItem(item)"
        :key="index">{{item.name}}<z-icon class="z-cascader-items__arrow"
          v-if="item.children"
          name="right"></z-icon>
      </div>
    </div>
    <div class="z-cascader-items__children"
      v-if="childrenItems">
      <z-cascader-items :items="childrenItems"
        :height="height"
        :level="level + 1"
        :selected="selected"
        @update:selected="onChildUpdateSelected"></z-cascader-items>
    </div>
  </div>
</template>

<script>
/**
 * 这个组件不能单独作为自定义组件的根组件：
 */
import Icon from './icon'
export default {
  name: 'zCascaderItems',
  props: {
    items: {
      type: Array
    },
    height: {
      type: String
    },
    selected: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  methods: {
    onClickItem (item) {
      const { selected, level } = this
      const result = JSON.parse(JSON.stringify(selected))
      result[level] = item
      result.splice(level + 1)
      // 而不是分开传参：this.$emit('updateSelected', { level, value: item })
      this.$emit('update:selected', result)
    },
    /**
     * 帮子组件往上传：
     */
    onChildUpdateSelected (selected) {
      this.$emit('update:selected', selected)
    }
  },
  computed: {
    childrenItems () {
      let result
      // 改为兼具响应selected和顶层数据两者的变化：
      const { items, level, selected } = this
      const temp = selected[level]
      if (selected && temp) {
        const item = items.find(item => item.name === temp.name)
        if (item && item.children && item.children.length) {
          result = item.children
        }
      }
      return result
    }
  },
  components: { 'z-icon': Icon }
}
</script>

<style lang="scss">
@import 'var';
// FIXME: 样式随便写的，不科学的写法：
.z-cascader-items {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  // 定高，可被用户传入的height通过设置style的方式覆盖掉：
  height: 100px;
  overflow: auto;
  .z-cascader-items__items {
    height: 100%;

    // 补上第一个item label到顶部的距离不足：
    padding: 0.3em 0;
  }
  .z-cascader-items__children {
    // height: 100%;// 应该没什么用
    border-left: 1px solid $z-border-gray--light;
  }
  .z-cascader-items__label {
    padding: 0.3em 1em;

    display: flex;
    align-items: center;
  }
  .z-cascader-items__arrow {
    margin-left: 1em;
    transform: scale(0.5);
  }
}
</style>
