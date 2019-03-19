<template>
  <div class="z-collapse-item">
    <div class="title" @click="toggle" :data-name="name">
      {{title}}
    </div>
    <div class="content" ref="content" v-if="open">
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
      },
      // 不支持Number，难受：
      name: {
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
      names => {
        if (names.indexOf(this.name) >= 0) {
          this.open = true
        } else {
          this.open = false
        }
      })
    },
    methods: {
      // 先通知同步所有组件该事件，再根据事件改变自己的状态：
      toggle () {
        if (this.open) {
          this.eventBus && this.eventBus.$emit('update:removeSelected', this.name)
        } else {
          this.eventBus && this.eventBus.$emit('update:addSelected', this.name)
        }
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

      background: lighten($grey, 8%);
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