<template>
  <div class="wrapper" :class="{error}">
    <!-- readonly 和 disabled 还是有区别的，readonly还能获得焦点的： -->
    <!-- 原生change事件直传给上一层： -->
    <input :value="value" type="text" :disabled="disabled" :readonly="readonly" 
      @change="$emit('change', $event.target.value)"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
    />
    <template v-if="error">
      <z-icon name="error" class="icon-error"></z-icon>
      <span class="errorMessage">{{error}}</span>
    </template>
  </div>
</template>

<script>
  import Icon from './icon'
  export default {
    components: { 'z-icon': Icon },
    name: 'zInput',
    props: {
      value: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      error: {
        type: String
      }
    }
  }
</script>

<style lang="scss">
  @import "var";
  $red: #F1453D;
  .wrapper {
    font-size: $z-font-size--small;
    display: inline-flex;
    align-items: center;
    > :not(:last-child) {margin-right: .5em; }
    > input {
      height: $z-button-height;
      border: 1px solid $z-border-gray1;
      border-radius: $z-border-radius;
      // 不是相对单位??
      padding: 0 8px;
      font-size: inherit;
      &:hover { border-color: $z-border-gray--hover1; }
      &:focus {
        @extend %z-box-shadow--focus1;
        outline: none;
      }
      &[disabled], &[readonly] {
        border-color: #bbb;
        color: #bbb;
        cursor: not-allowed;
      }
    }
    &.error {
      > input { border-color: $red; }
    }
    // 给去色后的svg素材上色：
    .icon-error { fill: $red; }
    .errorMessage { color: $red; }
  }
</style>
