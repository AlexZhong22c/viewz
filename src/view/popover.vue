<template>
  <div class="z-popover"
    ref="popover">
    <span
      ref="triggerWrapper"
      class="z-popover__trigger-wrapper">
      <slot></slot>
    </span>
    <div class="z-popover__content-wrapper"
      :class="contentWrapperClass"
      ref="contentWrapper"
      v-if="visible">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
// TODO:检测这个popover的高度，如果超过到窗口上边的距离(也就是容不下显示完全)，应该自动转到下面弹出来。
export default {
  name: 'zPopover',
  data() {
    return { visible: false }
  },
  mounted() {
    // 需要做的是open和close两种事件。对于type="click"来说是两次点击；对于type="hover"来说就是鼠标移入和移出。
    if (this.trigger === 'click') {
      this.$refs.triggerWrapper.addEventListener('click', this.onClickTrigger)
    } else {
      this.$refs.popover.addEventListener('mouseenter', this.open)
      this.$refs.popover.addEventListener('mouseleave', this.close)
    }
  },
  destroyed() {
    // 写在html模板的属性的事件绑定，vue会帮你解绑；而这些不会：
    if (this.trigger === 'click') {
      this.$refs.triggerWrapper.removeEventListener('click', this.onClickTrigger)
    } else {
      this.$refs.popover.removeEventListener('mouseenter', this.open)
      this.$refs.popover.removeEventListener('mouseleave', this.close)
    }
  },
  props: {
    position: {
      type: String,
      default: 'top',
      validator (value) {
        return ['top', 'bottom', 'left', 'right'].includes(value)
      }
    },
    trigger: {
      type: String,
      default: 'click',
      validator(value) {
        return ['click', 'hover'].includes(value)
      }
    }
  },
  computed: {
    contentWrapperClass() {
      return [`position-${this.position}`]
    }
  },
  methods: {
    positionContent() {
      const { contentWrapper, triggerWrapper } = this.$refs
      // 这句能否放在设置left top那两句之后??
      document.body.appendChild(contentWrapper)

      const { width, height, top, left } = triggerWrapper.getBoundingClientRect()
      const { height: cwHeight } = contentWrapper.getBoundingClientRect()
      // TODO: window.scrollX要兼容不同浏览器
      const positionMap = {
        top: { top: top + window.scrollY, left: left + window.scrollX },
        bottom: { top: top + height + window.scrollY, left: left + window.scrollX },
        left: { top: top + window.scrollY + ( height - cwHeight ) / 2, left: left + window.scrollX },
        right: { top: top + window.scrollY + (height - cwHeight) / 2, left: left + window.scrollX + width }
      }
      contentWrapper.style.left = positionMap[this.position].left + 'px'
      contentWrapper.style.top = positionMap[this.position].top + 'px'
    },
    /**
     * 对于绑定事件的回调函数，好的命名能帮助你明确回调函数所需做的事务，以便把事务区分开来；并且帮助你确定执行绑定和卸载的时机。
     * 而回调函数的触发，一般都是由用户触发，所以`触发时机`不由程序员决定，程序员只是约定了触发条件和(在回调函数中的)触发后的内容。
     * 3个时机变换： 绑定 --> (一般由用户)触发 --> 卸载
     * 回调函数 === 触发后执行的内容
     */
    /**
     * 绑定的时机：弹窗出来
     * `绑定对象`和该对象的事件：document / click
     * 回调函数(`触发绑定事件`后执行)：是否关闭弹窗和是否卸载该绑定
     */
    bindClickDocumentToClosePopover(e) {
        const { popover, contentWrapper } = this.$refs
        // 因为冒泡，它们都触发了document的click：
        // 由trigger引发: true false 不执行close，但由另一处代码决定是否close(这就是内聚close函数的好处)
        // 由弹窗dom引发: false true 不执行close
        // 由document引发: false false 执行close
        // 由其他的trigger(dom的引用内存地址不同)引发： false false 执行close
        if (popover &&
          (popover === e.target || popover.contains(e.target))
        ) { return }
        // contentWrapper的DOM不在popover的DOM中，所以要另外判断：
        if (contentWrapper &&
          (contentWrapper === e.target || contentWrapper.contains(e.target))
        ) { return }
        this.close()
    },
    open() {
      this.visible = true
      this.$nextTick(() => {
        this.positionContent()
        document.addEventListener('click', this.bindClickDocumentToClosePopover)
      })
    },
    close() {
      this.visible = false
      document.removeEventListener('click', this.bindClickDocumentToClosePopover)
    },
    onClickTrigger(event) {
      if (this.visible) {
        this.close()
      } else {
        this.open()
      }
    }
  }
}
</script>

<style scoped lang="scss">
// TODO: BEM
.z-popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
  .z-popover__trigger-wrapper {
    // 令span的高度基本上等于里面内容的最大高度。如果不放心可以用inline-flex，但是兼容性会差一点：
    display: inline-block;
  }
}
// 该元素被添加在body元素末端：
.z-popover__content-wrapper {
  $border-color: #333;
  $border-radius: 4px;
  position: absolute;

  padding: .5em 1em;

  // 给个最大宽度，不能太丑：
  max-width: 20em;
  // 中文网站加这个，如果是应用于英文网站不建议：
  word-break: break-all;

  border: 1px solid $border-color;
  border-radius: $border-radius;

  // 组合使用，解决⎡伪元素实现的箭头不能有box-shadow⎦的问题，但是兼容性比较差：
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
  background: white;

  &::before, &::after {
    content: '';
    display: block;
    border: 10px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
  }
  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before, &::after {
      left: 10px;
    }
    &::before {
      border-top-color: black;
      top: 100%;
    }
    &::after {
      border-top-color: white;
      // 盖住三角形一条边：
      top: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before, &::after {
      left: 10px;
    }
    &::before {
      border-bottom-color: black;
      bottom: 100%;
    }
    &::after {
      border-bottom-color: white;
      bottom: calc(100% - 1px);
    }
  }
  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;
    &::before, &::after {
      transform: translateY(-50%);
      top: 50%;
    }
    &::before {
      border-left-color: black;
      left: 100%;
    }
    &::after {
      border-left-color: white;
      left: calc(100% - 1px);
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before, &::after {
      transform: translateY(-50%);
      top: 50%;
    }
    &::before {
      border-right-color: black;
      right: 100%;
    }
    &::after {
      border-right-color: white;
      right: calc(100% - 1px);
    }
  }
}
</style>
