<template>
  <div class="z-popover"
    @click.stop="xxxxxx">
    <span ref="triggerWrapper"><slot></slot></span>
    <div class="z-popover__content-wrapper"
      ref="contentWrapper"
      v-if="visible">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zPopover',
  data() {
    return { visible: false }
  },
  methods: {
    xxxxxx() {
      this.visible = !this.visible
      if (this.visible) {
        this.$nextTick(() => {
          // 这句能否放在设置left top那两句之后??
          document.body.appendChild(this.$refs.contentWrapper)

          const { top, left } = this.$refs.triggerWrapper.getBoundingClientRect()
          // TODO: window.scrollX要兼容不同浏览器
          this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
          this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'

          // 点击body的时候能隐藏popover:
          const eventHandler = () => {
            this.visible = false
            document.removeEventListener('click', eventHandler)
          }
          document.addEventListener('click', eventHandler)
        })
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
}
// 该元素被添加在body元素末端：
.z-popover__content-wrapper {
  position: absolute;
  transform: translateY(-100%);
  border: 1px solid red;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}
</style>
