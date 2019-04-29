<template>
  <div class="z-pager"
    :class="{hide: hideOnSinglePage && total <= 1}">
    <span class="z-pager-nav prev"
      :class="{disabled:current===1}"
      @click="onClickPage(current-1)">
      <z-icon name="left"></z-icon>
    </span>
    <template v-for="(page, index) in pages">
      <span v-if="page === current" class="z-pager-item current" :key="page">{{page}}</span>
      <z-icon v-else-if="page === ellipsisText" class="z-pager-ellipsis"
          name="dots" :key="page+index"></z-icon>
      <span v-else class="z-pager-item"
        @click="onClickPage(page)" :key="page">{{page}}</span>
    </template>
    <span class="z-pager-nav next"
      :class="{disabled: current===total}"
      @click="onClickPage(current+1)">
      <z-icon name="right"></z-icon>
    </span>
  </div>
</template>

<script>
/**
 * @file 还差测试用例
 * @fixme 1. 单向数据流 this.$emit('update:current', n)
 * @todo 1. nearby多少，可定制
 */
import ZIcon from './icon'
/**
 * 场景：array = [1 1 2 3 4 5 20]
 * 先限制为纯数字，对pagerItem的数据类型起到限制的作用。
 * return [...new Set(array)]
 */
function unique (array) {
  const object = {}
  array.forEach(number => {
    object[number] = true
  })
  return Object.keys(object).map(s => parseInt(s, 10))
}

export default {
  name: 'ZPager',
  components: { ZIcon },
  props: {
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * @param total
     * @param current
     */
    pages () {
      return unique(
        [
          1,
          this.total,
          this.current,
          // nearby:
          this.current - 1,
          this.current - 2,
          this.current + 1,
          this.current + 2
        ]
          .filter(n => n >= 1 && n <= this.total)
          .sort((a, b) => a - b)
      // 其实就是只有第1和最后1前后才会出现省略号，这里没必要用reduce:
      ).reduce((prev, current, index, array) => {
        prev.push(current)
        array[index + 1] !== undefined &&
          array[index + 1] - array[index] > 1 &&
          prev.push(this.ellipsisText)
        return prev
      }, [])
    }
  },
  created () {
    /**
     * 组件data
     */
    // TODO:之后应该要换成文字，而不是省略号图标，这样可能更加合理。
    this.ellipsisText = '...'
  },
  methods: {
    onClickPage (n) {
      if (n >= 1 && n <= this.total) {
        // FIXME:必须要做成单向数据流的！！！！
        this.$emit('update:current', n)
      }
    }
  }
}
</script>

<style lang="scss">
@import "var";
.z-pager {
  display: flex;
  // 应该没用：
  // justify-content: flex-start;
  align-items: center;
  user-select: none;

  $width: 20px;
  $height: 20px;
  %z-pager-item-common {
    height: $height;
    margin: 0 4px;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    border-radius: $z-border-radius;
    font-size: $z-font-size--small;
    cursor: pointer;
  }
  .z-pager-ellipsis {
    width: $width;
    font-size: $z-font-size--small;
  }
  .z-pager-item {
    @extend %z-pager-item-common;
    min-width: $width;
    border: 1px solid $z-border-gray1;
    padding: 0 4px;
    &.current,
    &:hover {
      border-color: $z-border-blue1;
    }
    &.current {
      cursor: default;
    }
  }
  .z-pager-nav {
    @extend %z-pager-item-common;
    width: $width;
    background: $z-bg-gray1;
    &.disabled {
      cursor: default;
      svg {
        fill: darken($z-bg-gray1, 30%);
      }
    }
  }
  &.hide {
    display: none;
  }
}
</style>
