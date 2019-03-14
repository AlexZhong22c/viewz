import Vue from 'vue'
import Button from './view/button'
import ButtonGroup from './view/button-group'
import Icon from './view/icon'
import Input from './view/input'
import Row from './view/row'
import Col from './view/col'
import Layout from './view/layout'
import Header from './view/layout/header'
import Content from './view/layout/content'
import Footer from './view/layout/footer'
import Sider from './view/layout/sider'
// import Toast from './view/toast'
import plugin from './view/plugin'
import Tabs from './view/tabs'
import TabsHead from './view/tabs/tabs-head'
import TabsBody from './view/tabs/tabs-body'
import TabsItem from './view/tabs/tabs-item'
import TabsPane from './view/tabs/tabs-pane'
import Popover from './view/popover'
import Collapse from './view/collapse'
import CollapseItem from './view/collapse-item'

Vue.component('z-button', Button)
Vue.component('z-button-group', ButtonGroup)
Vue.component('z-icon', Icon)
Vue.component('z-input', Input)
Vue.component('z-row', Row)
Vue.component('z-col', Col)
Vue.component('z-layout', Layout)
Vue.component('z-header', Header)
Vue.component('z-content', Content)
Vue.component('z-footer', Footer)
Vue.component('z-sider', Sider)
Vue.component('z-tabs', Tabs)
Vue.component('z-tabs-head', TabsHead)
Vue.component('z-tabs-body', TabsBody)
Vue.component('z-tabs-item', TabsItem)
Vue.component('z-tabs-pane', TabsPane)
Vue.component('z-popover', Popover)
Vue.component('z-collapse', Collapse)
Vue.component('z-collapse-item', CollapseItem)

// Vue.component('z-toast', Toast)
// 通过js实例方法创建组件实例：
Vue.use(plugin)

new Vue({
  el: '#app',
  data: {
  },
  methods: {
  }
})
