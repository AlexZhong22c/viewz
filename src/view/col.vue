<template>
  <div class="z-col" :class="colClass" :style="colStyle">
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
    },
    computed: {
      colClass() {
        const { span, offset } = this
        return [
          span && `z-col-${span}`,
          offset && `z-col-offset-${offset}`
        ]
      },
      colStyle() {
        const { gutter } = this
        return {
          paddingLeft: `${gutter/2}px`,
          paddingRight:`${gutter/2}px`
        }
      }
    }
  }
</script>


<style lang="scss">
  .z-col {
    width: 50%;

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
