<template>
  <div>
    <div>{{selected && selected[0] && selected[0].name || '空' }}</div>
    <div>{{selected && selected[1] && selected[1].name || '空' }}</div>
    <div>{{selected && selected[2] && selected[2].name || '空' }}</div>
    <z-cascader :source="source"
      @update:source="onUpdateSource"
      popover-height="300px"
      :selected="selected"
      @update:selected="onUpdateSelected"
      :loadData="loadData"
    ></z-cascader>
    <z-cascader :source="source"
      @update:source="onUpdateSource"
      popover-height="300px"
      :selected="selected"
      @update:selected="onUpdateSelected"
      :loadData="loadData"
    ></z-cascader>
  </div>
</template>

<script>
import Cascader from './cascader'
import db from '../db'
import { removeListener } from './click-outside'

function ajax (pid = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = db.filter(item => item.pid === pid)

      result.forEach(rItem => {
        // 这部分是模拟，实际上只有后端才知道是否isLeaf：
        if (db.find(item => item.pid === rItem.id)) {
          rItem.isLeaf = false
        } else {
          rItem.isLeaf = true
        }
      })

      resolve(result)
    }, 3 * 100)
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
    onUpdateSource (source) {
      this.source = source
    },
    onUpdateSelected (selected) {
      this.selected = selected
    }
  },
  destroyed () {
    removeListener()
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
