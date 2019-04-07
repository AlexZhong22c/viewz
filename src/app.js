import Vue from 'vue'

import Button from './view/button/button'
import ButtonGroup from './view/button/button-group'
import Cascader from './view/cascader/cascader'
import Col from './view/grid/col'
import Collapse from './view/collapse/collapse'
import CollapseItem from './view/collapse/collapse-item'
import Content from './view/layout/content'
import Footer from './view/layout/footer'
import Header from './view/layout/header'
import Icon from './view/icon'
import Input from './view/input'
import Layout from './view/layout'
import Popover from './view/popover'
import Row from './view/grid/row'
import Sider from './view/layout/sider'
import Tabs from './view/tabs'
import TabsBody from './view/tabs/tabs-body'
import TabsHead from './view/tabs/tabs-head'
import TabsItem from './view/tabs/tabs-item'
import TabsPane from './view/tabs/tabs-pane'

import plugin from './view/plugin'

Vue.component('z-button', Button)
Vue.component('z-button-group', ButtonGroup)
Vue.component('z-cascader', Cascader)
Vue.component('z-col', Col)
Vue.component('z-collapse', Collapse)
Vue.component('z-collapse-item', CollapseItem)
Vue.component('z-content', Content)
Vue.component('z-footer', Footer)
Vue.component('z-header', Header)
Vue.component('z-icon', Icon)
Vue.component('z-input', Input)
Vue.component('z-layout', Layout)
Vue.component('z-popover', Popover)
Vue.component('z-row', Row)
Vue.component('z-sider', Sider)
Vue.component('z-tabs', Tabs)
Vue.component('z-tabs-body', TabsBody)
Vue.component('z-tabs-head', TabsHead)
Vue.component('z-tabs-item', TabsItem)
Vue.component('z-tabs-pane', TabsPane)
// import Toast from './view/toast'
// Vue.component('z-toast', Toast)
// 通过js实例方法创建Toast组件实例：
Vue.use(plugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      source: [{
        name: '浙江',
        children: [
          {
            name: '杭州',
            children: [
              { name: '上城' },
              { name: '下城' },
              { name: '江干' }
            ]
          },
          {
            name: '嘉兴',
            children: [
              { name: '南湖' },
              { name: '秀洲' },
              { name: '嘉善' }
            ]
          }
        ]
      }, {
        name: '福建',
        children: [
          {
            name: '福州',
            children: [
              { name: '鼓楼' },
              { name: '台江' },
              { name: '仓山' }
            ]
          }
        ]
      }, {
        name: '安徽',
        children: [{
          name: '合肥',
          children: [{
            name: '瑶海'
          }, {
            name: '庐阳'
          }]
        }]
      }]
    }
  },
  methods: {
  }
})
