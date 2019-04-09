<template>
  <div class="z-sub-nav" :class="{active, vertical}" v-click-outside="onClose">
    <div @click="onClick" class="z-sub-nav__label">
      <slot name="title"></slot>
      <span class="z-sub-nav__label-icon" :class="{'show-popover':showPopover}">
        <z-icon name="right"></z-icon>
      </span>
    </div>
    <!-- 技巧：直接把popover的v-show改成 vue 动画。 -->
    <template v-if="vertical">
      <transition @enter="enter" @leave="leave" @after-leave="onAfterLeave"
        @after-enter="onAfterEnter">
        <!-- 这段代码有重复的，能不能用变量控制是否中间层有transition元素??: -->
        <div class="z-sub-nav__popover" v-show="showPopover">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <div class="z-sub-nav__popover" v-show="showPopover">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
import ClickOutside from '../click-outside'
import ZIcon from '../icon'

export default {
  name: 'ZSubNav',
  components: { ZIcon },
  directives: { ClickOutside },
  inject: ['root', 'vertical'],
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
    /**
     * 我们做得这么复杂是因为利用js+transition过渡的方式实现动画，而如果是像官网示例纯js控制整个动画流程可能会更简单一点。
     * 之所以js+transition实现动画是为了演示el.getBoundingClientRect()触发重绘和重排。
     */
    enter (el, done) {
      const { height } = el.getBoundingClientRect()
      el.style.height = 0
      el.getBoundingClientRect()
      el.style.height = `${height}px`
      // 监听transitionend可能有兼容性问题，ie8以下可能不行。可以改为固定300ms的setTimeout。
      el.addEventListener('transitionend', () => {
        // 进入
        done()
      })
    },
    leave (el, done) {
      const { height } = el.getBoundingClientRect()
      el.style.height = `${height}px`
      el.getBoundingClientRect()
      el.style.height = 0
      el.addEventListener('transitionend', () => {
        done()
      })
    },
    // css的transition能处理opacity从0到100的渐变。但是不能处理height属性等属性从数字变化到auto，
    // 只能用js钩子控制这部分的变化。
    onAfterEnter (el) {
      el.style.height = 'auto'
    },
    onAfterLeave (el) {
      el.style.height = 'auto'
    },
    onClick () {
      this.showPopover = !this.showPopover
    },
    onClose () {
      this.showPopover = false
    },
    updateNamePath () {
      this.root.namePath.unshift(this.name)
      if (this.$parent.updateNamePath) {
        this.$parent.updateNamePath()
      }
    }
  }
}
</script>

<style lang="scss">
  @import "var";
  /* 虽然能开发出来，但是这个组件的样式已经特别难维护了： */
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

      // TODO: 这句样式的位置有待商榷：
      transition: height 250ms;
    }
    &.vertical {
      // 出于美观考虑，改写原有的样式：
      .z-sub-nav__popover {
        position: static;
        border-radius: 0;
        border: none;
        box-shadow: none;

        // 在展开父元素高度的动画过程中，父元素始终框住子元素们，超出父元素的子元素始终不显示：
        overflow: hidden;
      }
      // 二级的：
      .z-sub-nav .z-sub-nav__label-icon {
        transform: rotate(90deg);
        &.show-popover {
          transform: rotate(270deg);
        }
      }
    }
    &:not(.vertical) {
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
    }

    /*
     * 二级的那些：
    */
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
    .z-nav-item:not(.vertical) {
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
