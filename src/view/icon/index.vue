<template>
    <svg class="z-icon">
      <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>
export default {
  name: 'ZIcon',
  props: ['name'],
  mounted () {
    // import('./svg').then(Svg => {})
    // eslint-disable-next-line
    require('./svg')
  }
}
</script>

<style lang="scss">
  .z-icon {
    width: 1em;
    height: 1em;
  }
</style>
