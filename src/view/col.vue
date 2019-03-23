<template>
  <div class="z-col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
const validator = value => {
  const keys = Object.keys(value)
  for (const key of keys) {
    if (!['span', 'offset'].includes(key)) { return false }
  }

  return true
}
export default {
  name: 'zCol',
  props: {
    span: {
      type: [ Number, String ]
    },
    offset: {
      type: [ Number, String ]
    },
    ipad: { type: Object, validator },
    narrowPc: { type: Object, validator },
    pc: { type: Object, validator },
    widePc: { type: Object, validator }
  },
  data () {
    return {
      gutter: 0
    }
  },
  methods: {
    createClasses (propObj, str = '') {
      if (!propObj) { return [] }
      let array = []
      if (propObj.span) { array.push(`z-col-${str}${propObj.span}`) }
      if (propObj.offset) { array.push(`z-offset-${str}${propObj.offset}`) }
      return array
    }
  },
  computed: {
    colClass () {
      const {
        span, offset, ipad, narrowPc, pc, widePc,
        createClasses
      } = this
      return [
        ...createClasses({ span, offset }),
        ...createClasses(ipad, 'ipad-'),
        ...createClasses(narrowPc, 'narrow-pc-'),
        ...createClasses(pc, 'pc-'),
        ...createClasses(widePc, 'wide-pc-')
      ]
    },
    colStyle () {
      const { gutter } = this
      return {
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`
      }
    }
  }
}
</script>

<style lang="scss">
  .z-col {
    $class-prefix: 'z-col-';
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix: 'z-offset-';
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
    @media (min-width: 577px) {
      $class-prefix: 'z-col-ipad-';
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: 'z-offset-ipad-';
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
    @media (min-width: 769px) { // 770
      $class-prefix: 'z-col-narrow-pc-z';
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: 'z-offset-narrow-pc-';
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
    @media (min-width: 993px) {
      $class-prefix: 'z-col-pc-';
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: 'z-offset-pc-';
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
    @media (min-width: 1201px) {
      $class-prefix: 'z-col-wide-pc-';
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: 'z-offset-wide-pc-';
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }
  }
</style>
