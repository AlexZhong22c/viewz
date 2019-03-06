<template>
  <div class="z-tabs-head">
    <slot></slot>
    <div class="z-tabs-head__bottom-line" ref="bottomLine"></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'zTabsHead',
    inject: [ 'eventBus' ],
    mounted() {
      this.eventBus.$on('update:selected', (item, vm) => {
        const { width, left } = vm.$el.getBoundingClientRect()
        this.$refs.bottomLine.style.width = `${width}px`
        // better:硬件加速：(因为会导致bottomLine一开始从左边滑进来，所以先暂时放弃)
        // this.$refs.bottomLine.style.transform = `translateX(${left}px)`
        this.$refs.bottomLine.style.left = `${left}px`
      })
    }
  }
</script>

<style lang="scss">
  .z-tabs-head {
    $tab-height: 40px;
    $blue: blue;

    display: flex;
    height: $tab-height;
    position: relative;
    > .z-tabs-head__bottom-line {
      position: absolute;
      bottom: 0;
      border-bottom: 1px solid $blue;
      transition: all 350ms;
    }
    // 向右对齐：
    > .actions-wrapper {
      margin-left: auto;
    }
  }
</style>