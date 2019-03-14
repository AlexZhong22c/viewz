<template>
  <div class="z-collapse-item">
    <div class="title" @click="toggle">
      {{title}}
    </div>
    <div class="content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "zCollapseItem",
    props: {
      title: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        open: false
      }
    },
    inject: ['eventBus'],
    mounted () {
      this.eventBus && this.eventBus.$on('update:selected',
      vm => {
        if (vm !== this) {
          this.close()
        }
      })
    },
    methods: {
      toggle () {
        if (this.open) {
          this.open = false
        } else {
          this.open = true
          this.eventBus && this.eventBus.$emit('update:selected', this)
        }
      },
      close () {
        this.open = false
      }
    },
  }
</script>

<style scoped lang="scss">
  .z-collapse-item {
    $grey: #ddd;
    $border-radius: 4px;
    > .title {
      // TODO:这里多了一个border，导致圆角重叠问题，之后解决。
      border: 1px solid $grey;

      margin-top: -1px;
      margin-left: -1px;
      margin-right: -1px;

      // 垂直居中：
      min-height: 32px;
      display: flex;
      align-items: center;

      padding: 0 8px;
    }
    > .content {
      padding: 8px;
    }
    &:first-child {
      > .title {
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
      }
    }
    &:last-child {
      > .title:last-child {
        border-bottom-left-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
      }
    }
  }
</style>