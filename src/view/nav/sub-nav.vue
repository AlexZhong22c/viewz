<template>
  <div class="z-sub-nav" :class="{active}" v-click-outside="onClose">
    <div @click="onClick" class="z-sub-nav__label">
      <slot name="title"></slot>
      <span class="z-sub-nav__label-icon" :class="{'show-popover':showPopover}">
        <z-icon name="right"></z-icon>
      </span>
    </div>
    <div class="z-sub-nav__popover" v-show="showPopover">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ClickOutside from '../click-outside'
import ZIcon from '../icon'

export default {
  name: 'ZSubNav',
  components: { ZIcon },
  directives: { ClickOutside },
  inject: ['root'],
  props: {
    // sub-nav的label部分也顶做一个nav-item，所以必须要name。起到标记作用，方便加上例如高亮等功能。
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showPopover: false
    }
  },
  computed: {
    // active状态(示意用户它的下级是被选中的selected)和showPopover状态是不一样的，又要加一个变量记录状态。
    active () {
      return this.root.namePath.includes(this.name)
    }
  },
  methods: {
    onClick () {
      this.showPopover = !this.showPopover
    },
    onClose () {
      this.showPopover = false
    },
    }
  }
}
</script>

<style lang="scss">
  @import "var";
  .z-sub-nav {
    position: relative;
    .z-sub-nav__label {
      padding: 10px 20px;
    }
    // 在第一级不需要icon:
    .z-sub-nav__label-icon {
      display: none;
    }
    .z-sub-nav__popover {
      background: white;
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 4px;
      // 宽度不塌掉：
      white-space: nowrap;

      box-shadow: 0 0 3px fade_out(black, 0.8);
      border-radius: $z-border-radius;
      font-size: $z-font-size;
      color: $z-color-gray2;

      min-width: 8em;
    }
    // 下面这段代码和兄弟组件中的重复了：
    // 其实就是模拟在第一级的nav-item selected:
    &.active {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;

        border-bottom: 2px solid $z-border-blue1;
        width: 100%;
      }
    }

    // 用于给第二级改写第一级的样式：
    .z-sub-nav {
      .z-sub-nav__label {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .z-sub-nav__label-icon {
        display: inline-flex;
        margin-left: 1em;

        transition: transform 250ms;
        svg {
          fill: $z-color-gray2;
        }
        &.show-popover {
          transform: rotate(180deg);
        }
      }
      // 第二级及更下级的sub-nav__popover按照常理应该改为出现在右边:
      .z-sub-nav__popover {
        top: 0;
        left: 100%;
        margin-left: 8px;
      }
      &.active {
        &::after {
          display: none;
        }
      }
    }
    // 又和一级的z-nav-item样式不同：
    .z-nav-item {
      &.selected {
        color: $z-color-gray1;
        background: $z-bg-white--active1;
        // 去掉伪类构造的模拟底线样式：
        &::after {
          display: none;
        }
      }
    }
  }
</style>
