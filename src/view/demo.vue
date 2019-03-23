<template>
  <div>
    <div>{{selected && selected[0] && selected[0].name || '空' }}</div>
    <div>{{selected && selected[1] && selected[1].name || '空' }}</div>
    <div>{{selected && selected[2] && selected[2].name || '空' }}</div>
    <z-cascader :source="source" popover-height="300px" :selected="selected" @update:selected="onUpdateSelected"></z-cascader>
  </div>
</template>

<script>
import Cascader from './cascader'

export default {
  name: 'demo',
  data () {
    return {
      selected: [],
      source: [
        {
          name: '省1',
          children: [
            {
              name: '市1-1',
              children: [{ name: '区1-1-1' }, { name: '区1-1-2' }, { name: '区1-1-3' }]
            },
            {
              name: '市1-2',
              children: [{ name: '区1-2-1' }, { name: '区1-2-2' }, { name: '区1-2-3' }]
            }
          ]
        },
        {
          name: '省2',
          children: [
            {
              name: '市2-1',
              children: [{ name: '区2-1-1' }, { name: '区2-1-2' }, { name: '区2-1-3' }]
            }
          ]
        },
        {
          name: '省3',
          children: [
            {
              name: '市3',
              children: [
                {
                  name: '区3-1'
                },
                {
                  name: '区3-2'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    onUpdateSelected (selected) {
      this.selected = selected
    }
  },
  components: { 'z-cascader': Cascader }
}
</script>

<style lang="scss">
  *, *::before, *::after { box-sizing: border-box; }
</style>
