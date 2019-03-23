<template>
  <div>
    <div>{{selected && selected[0] && selected[0].name || '空' }}</div>
    <div>{{selected && selected[1] && selected[1].name || '空' }}</div>
    <div>{{selected && selected[2] && selected[2].name || '空' }}</div>
    <z-cascader :source="source"
      popover-height="300px"
      :selected="selected"
      @update:selected="onUpdateSelected"
      :loadData="loadData"></z-cascader>
  </div>
</template>

<script>
import Cascader from './cascader'
import db from '../db'

function ajax (pid = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = db.filter(item => item.pid === pid)
      resolve(result)
    }, 2 * 1000)
  })
}

export default {
  name: 'demo',
  data () {
    return {
      selected: [],
      source: []
    }
  },
  created () {
    ajax(0).then(result => {
      this.source = result
    })
  },
  methods: {
    loadData (targetItem, handler) {
      const { id } = targetItem
      ajax(id).then(result => {
        handler(result)
      })
    },
    onUpdateSelected (selected) {
      this.selected = selected
    }
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
