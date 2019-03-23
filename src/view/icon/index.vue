<template>
    <svg class="z-icon">
      <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>
export default {
  name: 'zIcon',
  props: ['name'],
  mounted () {
    // import('./svg').then(Svg => {})
    require('./svg')
  }
}
</script>

<style lang="scss">
  @keyframes z-icon-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .z-icon {
    width: 1em;
    height: 1em;
  }
</style>
