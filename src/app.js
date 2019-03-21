import Vue from 'vue'

import Button from './view/button'
import ButtonGroup from './view/button-group'
import Col from './view/col'
import Collapse from './view/collapse'
import CollapseItem from './view/collapse-item'
import Content from './view/layout/content'
import Footer from './view/layout/footer'
import Header from './view/layout/header'
import Icon from './view/icon'
import Input from './view/input'
import Layout from './view/layout'
import Popover from './view/popover'
import Row from './view/row'
import Sider from './view/layout/sider'
import Tabs from './view/tabs'
import TabsBody from './view/tabs/tabs-body'
import TabsHead from './view/tabs/tabs-head'
import TabsItem from './view/tabs/tabs-item'
import TabsPane from './view/tabs/tabs-pane'

Vue.component('z-button', Button)
Vue.component('z-button-group', ButtonGroup)
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

import plugin from './view/plugin'
// import Toast from './view/toast'
// Vue.component('z-toast', Toast)
// 通过js实例方法创建组件实例：
Vue.use(plugin)

new Vue({
  el: '#app',
  data: {
    selectedTab: ['2','1']
  },
  methods: {
  }
})
