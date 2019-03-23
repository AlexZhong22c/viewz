<template>
  <div>
    hi<z-cascader :source="source" popover-height="300px"></z-cascader>
  </div>
</template>

<script>
import Cascader from './cascader'

export default {
  name: 'demo',
  data () {
    return {
      source: [
        {
          name: '浙江',
          children: [
            {
              name: '杭州',
              children: [{ name: '上城' }, { name: '下城' }, { name: '江干' }]
            },
            {
              name: '嘉兴',
              children: [{ name: '南湖' }, { name: '秀洲' }, { name: '嘉善' }]
            }
          ]
        },
        {
          name: '福建',
          children: [
            {
              name: '福州',
              children: [{ name: '鼓楼' }, { name: '台江' }, { name: '仓山' }]
            }
          ]
        },
        {
          name: '安徽',
          children: [
            {
              name: '合肥',
              children: [
                {
                  name: '瑶海'
                },
                {
                  name: '庐阳'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {},
  components: { 'z-cascader': Cascader }
}
</script>

<style lang="scss">
</style>
