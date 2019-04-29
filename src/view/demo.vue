<template>
  <div style="margin: 20px;">
    <z-pager :total="10" :current.sync="current"></z-pager>
  </div>
</template>

<script>
import ZPager from './pager'

export default {
  name: 'demo',
  components: { ZPager },
  data () {
    return {
      current: 1
    }
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
