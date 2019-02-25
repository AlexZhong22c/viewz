<template>
  <div class="z-col" :class="[`z-col-${span}`]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'zCol',
    props: {
      span: {
        type: [ Number, String ]
      }
    }
  }
</script>


<style lang="scss">
  .z-col {
    height: 100px;
    width: 50%;
    background: grey;
    border: 1px solid red;

    $class-prefix: 'z-col-';
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
  }
</style>
