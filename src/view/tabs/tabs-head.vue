<template>
  <div class="z-tabs-head" ref="head">
    <slot></slot>
    <div class="z-tabs-head__bottom-line"
      ref="bottomLine"></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZTabsHead',
  inject: ['eventBus'],
  mounted () {
    this.eventBus.$on('update:selected', (item, vm) => {
      const { width, left } = vm.$el.getBoundingClientRect()
      const { left: headLeft } = this.$refs.head.getBoundingClientRect()

      this.$refs.bottomLine.style.width = `${width}px`
      // better:硬件加速：(因为会导致bottomLine一开始从左边滑进来，所以先暂时放弃)
      // this.$refs.bottomLine.style.transform = `translateX(${left}px)`
      this.$refs.bottomLine.style.left = `${left - headLeft}px`
    })
  }
}
</script>

<style lang="scss">
.z-tabs-head {
  $tab-height: 40px;
  $blue: blue;
  $border-color: #dddddd;

  display: flex;
  height: $tab-height;
  position: relative;
  border-bottom: 1px solid $border-color;
  > .z-tabs-head__bottom-line {
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid $blue;
    transition: all 350ms;
  }
  // 向右对齐：
  > .actions-wrapper {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1em;
  }
}
</style>
