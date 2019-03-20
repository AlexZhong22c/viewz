<template>
   <button class="z-button" :class="[`z-icon-${iconPosition}`]"
   @click="$emit('click')">
    <z-icon v-if="!loading && icon" class="icon" :name="icon"></z-icon>
    <z-icon v-if="loading" class="icon loading" name="loading"></z-icon>
    <div class="z-button-content">
      <slot></slot>
    </div>
   </button>
</template>

<script>
  export default {
    name: 'zButton',
    props: {
      icon: {},
      loading: {
        type: Boolean,
        default: false
      },
      iconPosition: {
        type: String,
        default: 'left',
        /* validator必须有返回值 */
        validator(value) {
          return ['left', 'right'].includes(value)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "src/_var.scss";
  .z-button {
    font-size: $z-font-size;
    height: $z-button-height;
    /* 写死width不好： */
    padding: 0 1em;
    border-radius: $z-border-radius;
    border: 1px solid $z-border-gray1;
    background: $z-bg-white1;

    /* 内容都居中 */
    display: inline-flex;
    justify-content: center;
    align-items: center;

    /* 弄掉行内元素默认基线对齐 */
    vertical-align: middle;
    &:hover {
      border-color: $z-border-gray--hover1;
    }
    &:active {
      background: $z-bg-white--active1;
    }
    /* 后面再优化focus样式： */
    &:focus {
      outline: none;
    }

    >.icon {
      order: 1;

      margin-right: .1em;
    }
    >.z-button-content {
      order: 2;
    }
    &.z-icon-right {
      >.icon {
        order: 2;

        margin-right: 0;
        margin-left: .1em;
      }
      >.z-button-content {
        order: 1;
      }
    }

    .loading {
      animation: z-icon-spin 2s infinite linear;
    }
  }
</style>
