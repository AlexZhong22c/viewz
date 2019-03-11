<template>
  <div class="z-popover"
    ref="popover">
    <span
      ref="triggerWrapper"
      class="z-popover__trigger-wrapper"
      @click="onClickTrigger">
      <slot></slot>
    </span>
    <div class="z-popover__content-wrapper"
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
  methods: {
    positionContent() {
      const { contentWrapper, triggerWrapper } = this.$refs
      // 这句能否放在设置left top那两句之后??
      document.body.appendChild(contentWrapper)

      const { top, left } = triggerWrapper.getBoundingClientRect()
      // TODO: window.scrollX要兼容不同浏览器
      contentWrapper.style.left = left + window.scrollX + 'px'
      contentWrapper.style.top = top + window.scrollY + 'px'
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
  transform: translateY(-100%);

  // transform: translateY已经用了：
  margin-top: -10px;
  padding: .5em 1em;

  // 给个最大宽度，不能太丑：
  max-width: 20em;
  // 中文网站加这个，如果是应用于英文网站不建议：
  word-break: break-all;

  border: 1px solid $border-color;
  border-radius: $border-radius;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  &::before, &::after {
    content: '';
    display: block;
    border: 10px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
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
</style>
