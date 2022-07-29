<template>
  <div ref="cutter"
    class="z-scroll__cutter"
    @mouseenter="onMouseEnterCutter"
    @mouseleave="onMouseLeaveCutter"
    @mousemove="onMouseMoveCutter"
    @wheel="onWheelCutter">
    <!-- 主体内容区： -->
    <div ref="content"
      class="z-scroll__content"
      :style="{transform: `translateY(${this.contentY}px)`}">
      <slot></slot>
    </div>

    <div class="z-scroll__track"
      v-show="isScrollBarVisible">
      <div class="z-scroll__bar"
        ref="bar"
        @mousedown="onMouseDownScrollBar"
        @selectstart="onSelectStartScrollBar">
        <!-- 模仿浏览器原生的样式： -->
        <div class="z-scroll__bar-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZScroll',
  data () {
    return {
      isScrollBarVisible: false,
      barHeight: undefined,
      cutterHeight: undefined,
      contentY: 0,
    }
  },
  beforeDestroy () {
    // TODO:
    // 移除 document 的事件监听
  },
  created () {
    /**
     * 组件内用于存储的data：
     */
    const data = {
      // 每个mousemove过程的起始位置和结束位置：
      saveStartPositionOfMouseMove: undefined,
      saveEndPositionOfMouseMove: undefined,
      saveScrollBarY: 0,
      isBarScrolling: false,
      isCutterMouseIn: false
    };
    this = {
      ...this,
      ...data
    };
  },
  mounted () {
    this.listenToDocument()

    this.cutterHeight = this.$refs.cutter.getBoundingClientRect().height
    this.updateScrollBar()
    this.listenToRemoteResources()
    this.listenToDomChange()
  },
  computed: {
    // 能滚动的最大值：
    maxScrollHeight () {
      return this.cutterHeight - this.barHeight
    },
    contentHeight () {
      // 可以优化保存this.$refs.content吗??
      return this.$refs.content.getBoundingClientRect().height
    }
  },

  methods: {
    /**
     * mounted
     */
    listenToDocument () {
      document.addEventListener('mousemove', e => this.onMouseMoveScrollBar(e))
      document.addEventListener('mouseup', e => this.onMouseUpScrollBar(e))
    },
    onMouseMoveScrollBar (e) {
      // 在mousedown到mouseup的范围之间才有效：
      if (!this.isBarScrolling) {
        return
      }
      this.saveEndPositionOfMouseMove = { x: e.screenX, y: e.screenY }
      // delta = end - start
      const delta = {
        x: this.saveEndPositionOfMouseMove.x - this.saveStartPositionOfMouseMove.x,
        y: this.saveEndPositionOfMouseMove.y - this.saveStartPositionOfMouseMove.y
      }
      this.saveScrollBarY = this.calculateScrollBarYWithLimit(delta)

      this.contentY = - this.saveScrollBarY / this.computeCutterRate()

      this.saveStartPositionOfMouseMove = this.saveEndPositionOfMouseMove
      this.$refs.bar.style.transform = `translate(0px,${this.saveScrollBarY}px)`
    },
    onMouseUpScrollBar (e) {
      this.isBarScrolling = false
      if (!this.isCutterMouseIn) {
        this.isScrollBarVisible = false
      }
    },
    listenToDomChange () {
      const targetNode = this.$refs.content
      const config = { attributes: true, childList: true, subtree: true }
      const callback = () => {
        this.listenToRemoteResources()
      }
      const observer = new MutationObserver(callback)
      observer.observe(targetNode, config)
    },
    /**
     * 单一功能
     */
    // 阻止让外界元素产生文本选中的效果：
    onSelectStartScrollBar (e) {
      e.preventDefault()
    },
    updateScrollBar () {
      let cutterHeight = this.cutterHeight
      let contentHeight = this.contentHeight
      this.barHeight = (cutterHeight * cutterHeight) / contentHeight
      this.$refs.bar.style.height = this.barHeight + 'px'
      this.saveScrollBarY = (-parentHeight * this.contentY) / contentHeight
      this.$refs.bar.style.transform = `translateY(${this.saveScrollBarY}px)`
    },
    listenToRemoteResources () {
      let tags = this.$refs.cutter.querySelectorAll('img, video, audio')
      Array.from(tags).map(tag => {
        if (tag.hasAttribute('data-z-listened')) {
          return
        }
        tag.setAttribute('data-z-listened', 'yes')
        tag.addEventListener('load', () => {
          this.updateScrollBar()
        })
      })
    },
    calculateContentYFromDeltaY (deltaY) {
      let contentY = this.contentY
      if (deltaY > 20) {
        contentY -= 20 * 3
      } else if (deltaY < -20) {
        contentY -= -20 * 3
      } else {
        contentY -= deltaY * 3
      }
      return contentY
    },
    calculateScrollBarYWithLimit (delta) {
      let newValue = parseInt(this.saveScrollBarY) + delta.y
      if (newValue < 0) {
        newValue = 0
      } else if (newValue > this.maxScrollHeight) {
        newValue = this.maxScrollHeight
      }
      return newValue
    },
    computeCutterRate () {
      const { cutterHeight, contentHeight } = this;
      return cutterHeight / contentHeight;
    },
    /**
     * z-scroll__cutter view:
     */
    onMouseEnterCutter () {
      this.isScrollBarVisible = true
      this.isCutterMouseIn = true
    },
    onMouseLeaveCutter () {
      this.isCutterMouseIn = false
      if (!this.isBarScrolling) this.isScrollBarVisible = false
    },
    onMouseMoveCutter () {
      this.isCutterMouseIn = true
    },
    onWheelCutter (e) {
      this.updateContentY(e.deltaY, () => e.preventDefault())
      this.updateScrollBar()
    },
    updateContentY (deltaY, fn) {
      let maxHeight = this.calculateContentYMax()
      this.contentY = this.calculateContentYFromDeltaY(deltaY)
      if (this.contentY > 0) {
        this.contentY = 0
      } else if (this.contentY < -maxHeight) {
        this.contentY = -maxHeight
      } else {
        fn && fn()
      }
    },
    calculateContentYMax () {
      let {
        borderTopWidth,
        borderBottomWidth,
        paddingTop,
        paddingBottom
      } = window.getComputedStyle(this.$refs.cutter)
      borderTopWidth = parseInt(borderTopWidth)
      borderBottomWidth = parseInt(borderBottomWidth)
      paddingTop = parseInt(paddingTop)
      paddingBottom = parseInt(paddingBottom)
      let maxHeight =
        this.contentHeight -
        this.cutterHeight +
        (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom)
      return maxHeight
    },
    /**
     * z-scroll__bar view
     */
    onMouseDownScrollBar (e) {
      this.isBarScrolling = true
      let { screenX, screenY } = e
      this.saveStartPositionOfMouseMove = { x: screenX, y: screenY }
    },
  }
}
</script>

<style scoped lang="scss">
.z-scroll__cutter {
  border: 1px solid red;
  overflow: hidden;
  position: relative;

  .z-scroll__content {
    transition: transform 0.05s ease;
  }

  .z-scroll__track {
    position: absolute;
    top: 0;
    right: 0;
    width: 14px;
    height: 100%;
    background: #fafafa;
    border-left: 1px solid #e8e7e8;
    opacity: 0.9;
  }
  .z-scroll__bar {
    position: absolute;
    top: -1px;
    left: 50%;
    height: 40px;
    width: 8px;
    margin-left: -4px;
    padding: 4px 0;
  }
  .z-scroll__bar-inner {
    height: 100%;
    border-radius: 4px;
    background: #c2c2c2;
    &:hover {
      background: #7d7d7d;
    }
  }
}
</style>
