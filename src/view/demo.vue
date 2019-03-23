<template>
  <div>
    <div>{{selected && selected[0] && selected[0].name || '空' }}</div>
    <div>{{selected && selected[1] && selected[1].name || '空' }}</div>
    <div>{{selected && selected[2] && selected[2].name || '空' }}</div>
    <z-cascader :source="source"
      popover-height="300px"
      :selected.sync="selected"></z-cascader>
  </div>
</template>

<script>
import Cascader from './cascader'
import db from '../db'

function ajax (pid = 0) {
  return db.filter(item => item.pid === pid)
}

console.log(ajax())

export default {
  name: 'demo',
  data () {
    return {
      selected: [],
      source: ajax()
    }
  },
  methods: {
  },
  components: { 'z-cascader': Cascader }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
