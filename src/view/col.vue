<template>
  <div class="z-col" :class="[span && `z-col-${span}`, offset && `z-col-offset-${offset}`]"
    :style="{paddingLeft:`${gutter/2}px`, paddingRight:`${gutter/2}px`}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'zCol',
    props: {
      span: {
        type: [ Number, String ]
      },
      offset: {
        type: [ Number, String ]
      }
    },
    data() {
      return {
        gutter: 0
      }
    }
  }
</script>


<style lang="scss">
  .z-col {
    height: 100px;
    width: 50%;
    border: 1px solid red;

    $class-prefix: 'z-col-';
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix: 'z-col-offset-';
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
</style>
