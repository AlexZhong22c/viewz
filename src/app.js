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


// Vue.component('z-toast', Toast)
// 通过js实例方法创建组件实例：
Vue.use(plugin)

new Vue({
  el: '#app',
  methods: {
    showToast() {
      this.$toast('我是 message')
    }
  }
})
