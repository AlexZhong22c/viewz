<template>
  <div class="z-toast-wrapper" :class="toastClass">
    <div class="z-toast" ref="z-toast">
      <div class="z-toast__message-wrapper">
        <slot v-if="!enableHTML"></slot>
        <div v-else v-html="$slots.default[0]"></div>
      </div>
      <div class="vertical-line" ref="vertical-line"></div>
      <span class="z-toast__close-button" @click="onClickClose">
        {{ closeButtonOption.text || DefaultCloseButtonText }}
      </span>
    </div>
  </div>
</template>

<script>
  // 能否优化 DefaultCloseButtonText??:
  const DefaultCloseButtonText = '关闭'
  export default {
    name: 'zToast',
    data() {
      return {
        DefaultCloseButtonText
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
      // 应该改成以毫秒为单位的：
      autoClose: {
        type: [ Boolean, Number ],
        default: 3,
        validator(value) {
          return value === false || typeof value === 'number';
        }
      },
      // 用默认值使得代码(尤其是判断)简洁很多：
      closeButtonOption: {
        type: Object,
        default() {
          return {
            text: DefaultCloseButtonText,
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
        this.$emit('beforeClose')
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
          }, this.autoClose * 1000)
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
  // 因为水平垂直居中用到的 transform: translate
  // 和 slide-up/down 的 transform: translate 冲突了
  // 所以多套一层div把这两组样式分到父子元素上：
  .z-toast-wrapper {
    $font-size: 14px;
    $z-toast-min-height: 40px;
    $z-toast-bg: rgba(0, 0, 0, 0.75);
    $animation-duration: 300ms;
    @keyframes z-toast-slide-up {
      0% { opacity: 0; transform: translateY(100%); }
      100% { opacity: 1; transform: translateY(0%); }
    }
    @keyframes z-toast-slide-down {
      0% { opacity: 0; transform: translateY(-100%); }
      100% { opacity: 1; transform: translateY(0%); }
    }
    @keyframes z-toast-fade-in {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    .z-toast {
      font-size: $font-size;
      min-height: $z-toast-min-height;

      line-height: 1.8;

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
    }
    &.position-top {
      top: 0;
      .z-toast {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        animation: z-toast-slide-down $animation-duration;
      }
    }
    &.position-bottom {
      bottom: 0;
      .z-toast {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        animation: z-toast-slide-up $animation-duration;
      }
    }
    &.position-middle {
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      .z-toast {
        animation: z-toast-fade-in $animation-duration;
      }
    }
  }
</style>
