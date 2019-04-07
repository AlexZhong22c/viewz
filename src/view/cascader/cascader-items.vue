<template>
  <div class="z-cascader-items"
    :style="{ height: height }">
    <div class="z-cascader-items__items">
      <div class="z-cascader-items__label"
        v-for="(item, index) in items"
        @click="onClickItem(item)"
        :key="index">
          <span class="z-cascader-items__label-text">{{item.name}}</span>
          <span class="z-cascader-items__icon-wrapper">
            <z-icon
              v-if="item.name === loadingItem.name"
              class="z-cascader-items__icon-loading"
              name="loading"
            ></z-icon>
          <z-icon class="z-cascader-items__icon-arrow"
            v-if="isRightArrowVisible(item) && item.name !== loadingItem.name"
            name="right"
          ></z-icon>
          </span>
      </div>
    </div>
    <div class="z-cascader-items__children"
      v-if="childrenItems">
      <z-cascader-items :items="childrenItems"
        :height="height"
        :level="level + 1"
        :selected="selected"
        :load-data="loadData"
        :loading-item="loadingItem"
        @update:selected="onChildUpdateSelected"></z-cascader-items>
    </div>
  </div>
</template>

<script>
/**
 * 这个组件不能单独作为自定义组件的根组件：
 */
import Icon from '../icon/index'
export default {
  name: 'ZCascaderItems',
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
    },
    loadData: {
      type: Function
    },
    loadingItem: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {}
  },
  methods: {
    isRightArrowVisible (item) {
      return this.loadData ? !item.isLeaf : item.children
    },
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
@import '../var';
.z-cascader-items {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  // 定高，可被用户传入的height通过设置style的方式覆盖掉：
  height: 100px;
  .z-cascader-items__items {
    height: 100%;
    overflow: auto;

    // 补上第一个item label到顶部的距离不足：
    padding: 0.3em 0;
  }
  .z-cascader-items__children {
    // height: 100%;// 应该没什么用
    border-left: 1px solid $z-border-gray--light;
  }
  .z-cascader-items__label {
    padding: 0.4em 1em;

    display: flex;
    align-items: center;

    // 因为cascader的display: inline-block:
    white-space: nowrap;

    cursor: pointer;
    &:hover {
      background: $z-bg-white--active1;
    }
  }
  .z-cascader-items__label-text {
    // 有效的：
    margin-right: 1em;

    user-select: none;
  }
  .z-cascader-items__icon-wrapper {
    // 外面有z-cascader-items__label包着，保持了每个item宽度一致：
    // 只管向右对齐：
    margin-left: auto;

    // 里面内容垂直居中：
    display: inline-flex;
    align-items: center;
  }
  .z-cascader-items__icon-arrow, .z-cascader-items__icon-loading {
    transform: scale(0.5);
  }
  .z-cascader-items__icon-loading {
    animation: z-spin 2s infinite linear;
  }
}
</style>
