<template>
  <div class="z-toast" ref="z-toast" :class="toastClass">
    <div class="z-toast__message-wrapper">
      <slot v-if="!enableHTML"></slot>
      <div v-else v-html="$slots.default[0]"></div>
    </div>
    <div class="vertical-line" ref="vertical-line"></div>
    <span class="z-toast__close-button" @click="onClickClose">
      {{ closeButtonOption.text || initCloseButtonText }}
    </span>
  </div>
</template>

<script>
  // 能否优化 initCloseButtonText??:
  const initCloseButtonText = '关闭'
  export default {
    name: 'zToast',
    data() {
      return {
        initCloseButtonText
      }
    },
    props: {
      enableHTML: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'top',
        validator(value) {
          return ['top', 'bottom', 'middle'].includes(value)
        }
      },
      // 这两个属性可以合并到一个Option里：
      autoClose: {
        type: Boolean,
        default: true
      },
      autoCloseDelay: {
        type: Number,
        default: 3
      },
      // 用默认值使得代码(尤其是判断)简洁很多：
      closeButtonOption: {
        type: Object,
        default() {
          return {
            text: initCloseButtonText,
            callback: undefined
          }
        }
      }
    },
    mounted () {
      this.refreshVerticalLineStyle()
      // 从这个元素被挂载之时开始计时：
      this.initAutoClose()
    },
    computed: {
      toastClass() {
        return {
          [`position-${this.position}`]: true
        }
      }
    },
    methods: {
      close() {
        // 一定要remove才能从页面上去掉：
        this.$el.remove()
        this.$destroy()
      },
      refreshVerticalLineStyle() {
        this.$nextTick(() => {
          // height: 100%:
          this.$refs['vertical-line'].style.height =
            `${this.$refs['z-toast'].getBoundingClientRect().height}px`
        })
      },
      initAutoClose() {
        if (this.autoClose) {
          setTimeout(() => {
            this.close()
          }, this.autoCloseDelay * 1000)
        }
      },
      // 设置的这个时机好像不是特别好，目前，自动关闭的话就不执行这个了:
      onClickClose () {
        this.close()
        if (this.closeButtonOption && typeof this.closeButtonOption.callback === 'function') {
          // 传递 toast实例过去：
          this.closeButtonOption.callback(this)
        }
      }
    }
  }
</script>

<style lang="scss">
  .z-toast {
    $font-size: 14px;
    $z-toast-min-height: 40px;
    $z-toast-bg: rgba(0, 0, 0, 0.75);
    font-size: $font-size;
    min-height: $z-toast-min-height;

    line-height: 1.8;

    position: fixed;

    display: flex;
    color: white;
    align-items: center;
    background: $z-toast-bg;
    border-radius: 4px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
    padding: 0 16px;
    // 为什么要套多一层div.message呢，是因为单纯的<slot></slot>是不能给它设置class和style的。
    .z-toast__message-wrapper {
      padding: 8px 0;
    }
    .z-toast__close-button {
      padding-left: 16px;
      /* 其父元素是display:flex，用该样式不被压窄： */
      flex-shrink: 0;
    }
    .vertical-line {
      // 父元素要自适应多行内容，所以只设置min-height，
      // 导致子元素这句设置height:100%无效，改为用refreshVerticalLineStyle设置height:
      // height: 100%;
      border-left: 1px solid #666;
      margin-left: 16px;
    }
    left: 50%;
    transform: translateX(-50%);
    &.position-top {
      top: 0;
    }
    &.position-bottom {
      bottom: 0;
    }
    &.position-middle {
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
